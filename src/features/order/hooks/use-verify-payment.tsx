import { verifyPayment } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useVerifyPayment({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const verify = useMutation({
    mutationFn: ({ id, approve }: any) => verifyPayment(id, approve),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-order"] });
      toast.success("Pembayaran berhasil diverifikasi");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { verify };
}
