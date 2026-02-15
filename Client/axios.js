import { getCookie } from "./src/lib/cookie";
import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8000"
});

api.interceptors.request.use((config) => {
    const token = getCookie();
    config.headers.Authorization = `Bearer ${token}`
    return config;
})