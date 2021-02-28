
export interface Projects {
    projects?: (Property)[] | null;
}

export interface Property {
    name: string;
    category: string;
    projectGoal: number;
    totalSlots: number;
    availableSlots: number;
    img: string;
    description: string;
}

export interface ProjectsCategories {
    category: string;
}

export interface ProjectsResponse {
    projects?: (Property)[] | null;
}
  