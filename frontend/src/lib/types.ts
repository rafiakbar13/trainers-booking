import { z } from "zod";
export const SignupSchema = z.object({
    fullname: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    photo: z.string().url({ message: "Invalid image url" }),
    role: z.string(),
    gender: z.string(),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;