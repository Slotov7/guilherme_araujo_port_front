import { useState, useEffect, SetStateAction } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/services/api";
import { Project, Technology } from "@/types/project";

export function useProjectForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    repoUrl: "",
    imageUrl: "",
    technologies: [] as Technology[],
  });

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    if (isEditMode && id) {
      setPageLoading(true);
      api.Projects.getProjectById(id)
        .then((project: Project) => {
          setFormData(project);
          if (project.imageUrl) {
            setPreviewUrl(project.imageUrl);
          }
        })
        .catch((err: any) => {
          console.error(err);
          setError("Erro ao carregar projeto.");
        })
        .finally(() => setPageLoading(false));
    } else {
      setPageLoading(false);
    }
  }, [isEditMode, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (techs: Technology[]) => {
    setFormData((prev) => ({ ...prev, technologies: techs }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert("O arquivo é muito grande! Máximo 5MB.");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("project", JSON.stringify(formData));

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await api.Projects.updateProject(id, data);
      } else {
        await api.Projects.createProject(data);
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao salvar projeto.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push("/dashboard");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return {
    isEditMode,
    formData,
    previewUrl,
    imageFile,
    loading,
    pageLoading,
    error,
    showSuccessModal,
    handleChange,
    handleImageChange,
    handleTechChange,
    handleSubmit,
    handleCloseSuccessModal,
    formatFileSize,
    MAX_FILE_SIZE,
  };
}
