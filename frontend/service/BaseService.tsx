import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_API
})

export class BaseService {

    url: string;

    constructor(url: string) {
        this.url = url;

        axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('TOKEN_FRONTEND_APP');
            const authRequestToken = token ? `Bearer ${token}` : '';
            config.headers['Authorization'] = authRequestToken;
            return config;
        },
            (error) => Promise.reject(error)
        );

        axiosInstance.interceptors.response.use((response) => {            
            return response;
        }, async (erro) => {
            const originalConfig = erro.config;          
            console.log(erro.response.status);
            if (erro.response.status == 401) {
                localStorage.removeItem('TOKEN_FRONTEND_APP');
                window.location.reload();         
            }
            return Promise.reject(erro);
        });
    }

    listAll() {
        console.log("chamando url: " + this.url);
        return axiosInstance.get(this.url);
    }

    findById(id: number) {
        return axiosInstance.get(this.url + "/" + id);
    }

    create(obj: any) {
        return axiosInstance.post(this.url, obj);
    }

    update(obj: any) {
        return axiosInstance.put(this.url, obj);
    }

    delete(id: number) {
        return axiosInstance.delete(this.url + "/" + id);
    }
}