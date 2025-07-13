import { Project } from "@/types/project";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Sua lógica para FormData, que está ótima.
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: object | FormData) => instance.post(url, body).then(responseBody),
    put: (url: string, body: object | FormData) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export const ProjectsAPI = {
    getProjects: (): Promise<Project[]> => requests.get("/projects"),

    getProjectById: (id: number): Promise<Project> => requests.get(`/projects/${id}`),

    createProject: (project: FormData): Promise<Project> => requests.post("/projects", project),

    updateProject: (id: number, project: FormData): Promise<Project> => requests.put(`/projects/${id}`, project),

    deleteProject: (id: number): Promise<void> => requests.delete(`/projects/${id}`),
};


interface LoginCredentials {
    username: string;
    password: string;
    recaptchaResponse: string;
}

export const AuthAPI = {
    login: (creds: LoginCredentials): Promise<string> => requests.post("/auth/login", creds),
};

interface ContactFormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
}

export const ContactAPI = {
    sendContactEmail: (data: ContactFormData): Promise<void> => requests.post("/contact", data),
};


export const CvAPI = {
    uploadCv: (formData: FormData) => {
        const token = localStorage.getItem("authToken");

        return axios.post("http://localhost:8080/api/cv/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
    }
};
