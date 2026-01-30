import api from "../utils/axios";
import type {LoginPayload, RegisterPayload} from "../types";

export const authService = {
    register: async (data: RegisterPayload) => {
        const res = await api.post("/auth/register", data);
        return res.data;
    },
    login: async (data: LoginPayload) => {
        const res = await api.post("/auth/login", data);
        localStorage.setItem("accessToken", res.data.accessToken);
        return res.data;
    },
    logout: async () => {
        await api.post("/auth/logout");
        localStorage.removeItem("accessToken");
    },
}
