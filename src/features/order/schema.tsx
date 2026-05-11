import { z } from "zod";

export const payloadSchema = z.object({
  id: z.string().optional(),
  status: z.enum([
    "pending",
    "diproses",
    "menuju_lokasi",
    "completed",
    "cancelled",
  ]),
  payment_status: z
    .enum(["pending", "waiting_verification", "paid", "rejected"])
    .optional(),
  user_name: z.string().min(3, "Nama pengguna minimal 3 karakter"),
  user_phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  user_email: z.string().email("Email tidak valid"),
  service_name: z.string().min(3, "Nama layanan minimal 3 karakter"),
  price_service: z.number().positive("Harga harus lebih dari 0"),
  problem_note: z.string().optional(),
  address_text: z.string().optional(),
  payment_proof: z.string().optional(),
  technician_id: z.string().optional(),
  technician_name: z.string().optional(),
});

export type PayloadData = z.infer<typeof payloadSchema>;

export const defaultValues: PayloadData = {
  id: "",
  status: "pending",
  payment_status: "pending",
  user_name: "",
  user_phone: "",
  user_email: "",
  service_name: "",
  price_service: 0,
  problem_note: "",
  address_text: "",
  payment_proof: "",
  technician_id: "",
  technician_name: "",
};
