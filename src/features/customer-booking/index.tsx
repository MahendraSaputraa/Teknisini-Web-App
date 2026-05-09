"use client";
import LeftForm from "./components/left-form";
import Cart from "./components/cart";
import { useCreateOrder } from "./hooks/use-create-order";
import { createOrderSchema } from "./schema";
import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@/contexts/user-contect";

export default function CustomerBookingData() {
  const { user } = useUser();

  console.log("data user", user);

  const [formData, setFormData] = useState({
    user_id: user.uid || "",
    name: "",
    whatsapp: "",
    category: "",
    service: "",
    notes: "",
    location: { lat: -8.65, lng: 115.216667 },
    address: "Geser pin pada peta untuk menentukan lokasi...",
  });

  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleSubmit = () => {
    const validation = createOrderSchema.safeParse(formData);

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message;
      return toast.error("Validasi Gagal", { description: firstError });
    }

    createOrder(formData);
  };

  return (
    <section className="w-full bg-slate-50 py-12 dark:bg-background md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Lengkapi Permintaan Layanan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Jelaskan kebutuhan teknis Anda secara mendalam untuk mendapatkan
            penanganan terbaik dari mitra kami.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <LeftForm setFormData={setFormData} formData={formData} />
          <Cart handleSubmit={handleSubmit} isPending={isPending} />
        </div>
      </div>
    </section>
  );
}
