import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  practiceArea: z.enum(["criminal", "civil"]).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(2000, "Message is too long").optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  subject: z.string().max(200, "Subject is too long").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
