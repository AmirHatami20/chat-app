import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService.ts";
import type { RegisterPayload, LoginPayload } from "../types";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["user", "me"], null);
    },
  });
};
