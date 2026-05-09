"use client";
import LeftForm from "./components/left-form";
import Cart from "./components/cart";
import { useCreateOrder } from "./hooks/use-create-order";
import { createOrderSchema } from "./schema";
import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@/contexts/user-contect";
import { useCategories } from "./hooks/use-get-category";
import { useServices } from "./hooks/use-get-service";

export default function CustomerBookingData() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    user_id: user?.uid || "",
    user_email: user?.email || "",
    user_phone: user?.phone || "",
    name: user?.name || "",
    category_id: "",
    service_name: "",
    service_id: "",
    price_service: 0,
    notes: "",
    location: { lat: -8.65, lng: 115.216667 },
    address: "Geser pin pada peta untuk menentukan lokasi...",
  });

  console.log("formdata", formData);

  const { data: categoryData } = useCategories();
  const { data: serviceData } = useServices(!!formData.category_id);

  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleSubmit = () => {
    const validation = createOrderSchema.safeParse(formData);

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message;
      return toast.error("Validasi Gagal", { description: firstError });
    }

    const payload = {
      user_id: formData.user_id || "",
      user_email: formData.user_email || "",
      user_phone: formData.user_phone || "",
      user_name: formData.name || "",
      service_id: formData.category_id || "",
      service_name: formData.service_name || "",
      problem_note: formData.notes || "",
      location: formData.location || "",
      address_text: formData.address || "",
      price_service: formData.price_service || 0,
    };

    createOrder(payload);
  };

  const optionsCategory = categoryData?.data?.map(
    (item: Record<string, any>) => ({
      label: item.name,
      value: item.id,
    }),
  );
  const optionsService = serviceData?.data
    ?.filter((item: any) => item.category_id === formData.category_id)
    .map((item: Record<string, any>) => ({
      label: item.name,
      value: item.id,
      price: item.price,
    }));

  const test = optionsService?.find(
    (item: any) => item.value === formData.service_id,
  );

  console.log("hasil", test);

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
          <LeftForm
            setFormData={setFormData}
            formData={formData}
            optionsCategory={optionsCategory}
            optionsService={optionsService}
          />
          <Cart
            handleSubmit={handleSubmit}
            isPending={isPending}
            formData={formData}
          />
        </div>
      </div>
    </section>
  );
}
