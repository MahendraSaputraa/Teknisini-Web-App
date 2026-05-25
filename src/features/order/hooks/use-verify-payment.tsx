// hooks/use-verify-payment.ts
import { verifyPayment } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface VerifyPaymentParams {
  id: string;
  approve: boolean;
}

interface UseVerifyPaymentOptions {
  onSuccessCallback?: (res?: any) => void;
}

export function useVerifyPayment({
  onSuccessCallback,
}: UseVerifyPaymentOptions = {}) {
  const queryClient = useQueryClient();

  const verify = useMutation({
    mutationFn: ({ id, approve }: VerifyPaymentParams) =>
      verifyPayment(id, approve), // <-- pastikan ini yang terpanggil, bukan endpoint lain
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      toast.success("Pembayaran berhasil diverifikasi");
      onSuccessCallback?.(res);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Gagal memverifikasi pembayaran",
      );
    },
  });

  return { verify };
}
