import axios from 'axios';
import { PropertiesResponse } from './models';

export const api = axios.create({
    baseURL: 'http://localhost:6500/api'
})

export async function getProperties(){
    try {
        const response = await api.get('/properties');
        return response.data as PropertiesResponse;
    } catch (e) {
        console.error(e)
    }
}

export async function investInProperty(payload: object){
    try {
        const response = await api.post(`/properties/invest/${payload.propertyId}`, payload);
        return response.data;
    } catch (e) {
        console.error(e)
    }
}