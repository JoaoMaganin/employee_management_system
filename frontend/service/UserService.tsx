import axios from "axios";



export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
})

export class UserService {

    listAll() {
        return axiosInstance.get("/user");
    }

    create(user: Project.User) {
        return axiosInstance.post("/user", user);
    }

    update(user: Project.User) {
        console.log("Enviando PUT para atualizar usuário:", user);
        return axiosInstance.put("/user", user);
    }

    delete(id: number) {
        return axiosInstance.delete("/user/" + id);
    }
}