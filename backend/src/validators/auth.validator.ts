import {z} from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(2, "Username must be at least 2 characters")
        .max(30, "Username cannot exceed 30 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email format")
        .max(50, "Email cannot exceed 50 characters"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
});

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(1)
});

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;
