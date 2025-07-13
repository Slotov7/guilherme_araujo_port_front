import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Project} from "@/types/project";
import {ProjectsAPI} from "@/services/api";

export function  useProjects() {
    const { logout } = useAuth();
    const router = useRouter();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<{ id: number, name: string } | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false)


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await ProjectsAPI.getProjects();
                setProjects(data);
            } catch (err: any) {
                console.error("Erro ao buscar projetos:", err);
                setError("Não foi possível carregar os projetos. A sua sessão pode ter expirado.");
                if (err.response?.status === 401 || err.response?.status === 403) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [logout, router]);

    const handleDelete = (projectId: number, projectName: string) => {
        setSelectedProject({ id: projectId, name: projectName });
        setShowConfirmModal(true);
        setShowSuccessModal(false);
        setShowFailureModal(false);
    };

    const confirmDelete = async () => {
        if (!selectedProject) return;

        try {
            await ProjectsAPI.deleteProject(selectedProject.id);
            setProjects((current) => current.filter(p => p.id !== selectedProject.id));
            setShowSuccessModal(true);
        } catch (err) {
            console.error("Erro ao apagar projeto:", err);
            setShowFailureModal(true)
        } finally {
            setShowConfirmModal(false);
            setSelectedProject(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setSelectedProject(null);
    };

    const handleEdit = (projectId: number) => {
        router.push(`/dashboard/projects/edit/${projectId}`);
    };

    const handleCreateProject = () => {
        router.push('/dashboard/projects/new');
    };

    return {
        projects,
        loading,
        error,
        showConfirmModal,
        selectedProject,
        showSuccessModal,
        showFailureModal,
        setShowConfirmModal,
        setSelectedProject,
        setShowSuccessModal,
        setShowFailureModal,
        handleDelete,
        confirmDelete,
        cancelDelete,
        handleEdit,
        handleCreateProject
    };
}