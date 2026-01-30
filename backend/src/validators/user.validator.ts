import {z} from "zod";

export const sendOtpSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
})

export const resetPasswordSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
    otp: z.string().trim().length(6, "OTP must be 6 digits"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export type SendOtpType = z.infer<typeof sendOtpSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;