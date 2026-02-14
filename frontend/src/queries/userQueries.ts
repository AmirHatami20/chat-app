import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";
import type { ResetPasswordPayload, User } from "../types";

export const useGetMe = () => {
  return useQuery<User>({
    queryKey: ["user", "me"],
    queryFn: () => userService.getMe(),
    retry: false,
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user", "uploadAvatar"],
    mutationFn: (formData: FormData) => userService.uploadAvatar(formData),
    onSuccess: (user) => {
      queryClient.setQueryData(["user", "me"], user);
    },
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ["user", "sendOtp"],
    mutationFn: (email: string) => userService.sendOtp(email),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["user", "resetPassword"],
    mutationFn: (payload: ResetPasswordPayload) =>
      userService.resetPassword(payload),
  });
};
