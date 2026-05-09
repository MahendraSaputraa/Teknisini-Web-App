import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/order";
export const useCreateOrder = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: any) => createOrder(payload),
    onSuccess: (data) => {
      toast.success("Pesanan Berhasil", {
        description: "Menuju halaman pembayaran...",
      });

      const orderId = data?.data?.id || data?.id;
      if (orderId) {
        router.push(`/customer/payment/${orderId}`);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Gagal membuat pesanan";
      toast.error("Terjadi Kesalahan", {
        description: errorMessage,
      });
    },
  });
};
