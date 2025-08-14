import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_API
})

export class LoginService {
    
    newUser(user: Project.User) {
        return axiosInstance.post('/auth/newUser', user);
    }
}