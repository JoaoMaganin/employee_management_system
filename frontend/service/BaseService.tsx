import axios from "axios";



export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_API
})

export class BaseService {

    url: string;

    constructor(url: string) {
        this.url = url;
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