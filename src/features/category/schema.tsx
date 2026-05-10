import { z } from "zod";

export const payloadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  description: z.string().optional(),
  icon: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type PayloadData = z.infer<typeof payloadSchema>;

export const defaultValues: PayloadData = {
  id: "",
  name: "",
  description: "",
  icon: "",
  is_active: true,
};
