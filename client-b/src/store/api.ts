import axios from 'axios';
import { ProjectsResponse } from './models';

export const api = axios.create({
    baseURL: 'http://localhost:6500/api'
})

export async function getProjects(){
    try {
        const response = await api.get('/projects');
        return response.data.projects as ProjectsResponse;
    } catch (e) {
        console.error(e)
    }
}

export async function investInProject(payload: object){
    try {
        const response = await api.post(`/projects/fund/${payload.projectId}`, payload);
        return response.data;
    } catch (e) {
        console.error(e)
    }
}