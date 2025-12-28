export interface Technology {
    id: number;
    name: string;
    imageUrl: string;
}

export interface Project{
    id?: number;
    name: string;
    description: string;
    imageUrl: string;
    repoUrl?: string;
    technologies: Technology[];
}