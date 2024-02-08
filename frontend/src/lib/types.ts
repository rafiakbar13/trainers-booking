import { z } from "zod";
export const SignupSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  photo: z.instanceof(FileList),
  role: z.string(),
  gender: z.string(),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;

const experienceSchema = z.object({
  startingDate: z.string().optional(),
  endDate: z.string().optional(),
  position: z.string().optional(),
  hospital: z.string().optional(),
});

const timeSlotSchema = z.object({
  day: z.string().optional(),
  startingTime: z.string().optional(),
  endingTime: z.string().optional(),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6).optional(),
  photo: z.string().optional(),
  phone: z.string().min(11).max(13).optional(),
  bio: z.string().optional(),
  gender: z.string(),
  specialization: z.string().optional(),
  experience: z.array(experienceSchema).optional(),
  position: z.string().optional(),
  hospital: z.string().optional(),
  ticketPrice: z.string().optional(),
  timeSlots: z.array(timeSlotSchema).optional(),
  about: z.string().optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
