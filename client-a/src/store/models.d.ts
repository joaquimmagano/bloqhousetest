
export interface Properties {
    properties?: (Property)[] | null;
}

export interface Property {
    name: string;
    location: string;
    totalValue: number;
    totalShares: number;
    availableShares: number;
    img: string;
    description: string;
}

export interface PropertiesLocation {
    location: string;
}

export interface PropertiesResponse {
    properties?: (Property)[] | null;
}
  