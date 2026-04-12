import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(9, "Nomor minimal 9 angka"),
  name: z.string().min(2, "Nama minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
