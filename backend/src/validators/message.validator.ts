import {z} from "zod";

export const messageSchema = z.object({
    text: z.string().trim().min(1).max(500),
    receiverId: z.string(),
});

export type MessageType = z.infer<typeof messageSchema>;
