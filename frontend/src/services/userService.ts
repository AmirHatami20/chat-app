import type {ResetPasswordPayload, User} from "../types";
import api from "../utils/axios";

export const userService = {
    getMe: async (): Promise<User> => {
        const res = await api.get("/user/getMe", {withCredentials: true});
        return res.data.user;
    },

    uploadAvatar: async (formData: FormData): Promise<User> => {
        const res = await api.post("/user/upload-avatar", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return res.data.user;
    },

    sendOtp: async (email: string) => {
        const res = await api.post("/user/forgot-password/send-otp", email);
        return res.data;
    },

    resetPassword: async (payload: ResetPasswordPayload) => {
        const res = await api.post("/user/forgot-password/reset", payload);
        return res.data;
    },
};
