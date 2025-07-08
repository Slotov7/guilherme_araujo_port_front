import { Project } from "@/types/project";
import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        // Tenta obter o token do localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        // Se o token existir, adiciona-o ao cabeçalho Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Se for FormData, deixa o axios configurar automaticamente o Content-Type
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        // Retorna a configuração modificada
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
    put: (url: string, body: object) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export const ProjectsAPI = {
    getProjects: (): Promise<Project[]> => requests.get("/projects"),
    getProjectById: (id: number) => requests.get(`/projects/${id}`),
    createProject: (project: FormData) => requests.post("/projects", project),
    updateProject: (id: number, project: FormData) => requests.put(`/projects/${id}`, project),
    deleteProject: async (id: number, name: string) => {
        return await requests.delete(`/projects/${id}`);
    },
};

interface LoginCredentials {
    username: string;
    password: string;
    recaptchaResponse: string;
}

export const AuthAPI = {
    login: (creds: LoginCredentials): Promise<string> => requests.post("/auth/login", creds),
};