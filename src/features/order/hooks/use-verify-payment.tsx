// hooks/use-verify-payment.ts
import { verifyPayment } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface VerifyPaymentParams {
  id: string;
  approve: boolean;
}

interface UseVerifyPaymentOptions {
  onSuccessCallback?: () => void;
}

export function useVerifyPayment({
  onSuccessCallback,
}: UseVerifyPaymentOptions = {}) {
  const queryClient = useQueryClient();

  const verify = useMutation({
    mutationFn: ({ id, approve }: VerifyPaymentParams) =>
      verifyPayment(id, approve), // <-- pastikan ini yang terpanggil, bukan endpoint lain
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Pembayaran berhasil diverifikasi");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Gagal memverifikasi pembayaran",
      );
    },
  });

  return { verify };
}
