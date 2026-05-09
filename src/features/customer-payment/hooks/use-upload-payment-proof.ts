import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadPaymentProof } from "@/services/order";
import { uploadFileToStorage } from "@/lib/services/file-storage";

export interface UseUploadPaymentProofParams {
  orderId: string;
  onSuccess?: () => void;
}

export const useUploadPaymentProof = ({
  orderId,
  onSuccess,
}: UseUploadPaymentProofParams) => {
  return useMutation({
    mutationFn: async (file: File) => {
      try {
        // Step 1: Upload file ke Firebase Storage
        toast.loading("Mengunggah bukti pembayaran...");
        const paymentProofUrl = await uploadFileToStorage(
          file,
          "payment-proofs",
        );

        // Step 2: Kirim URL ke API
        const response = await uploadPaymentProof(orderId, paymentProofUrl);

        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Bukti Pembayaran Berhasil", {
        description:
          "Bukti pembayaran Anda telah diunggah dan sedang diverifikasi.",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Gagal mengunggah bukti pembayaran";
      toast.error("Terjadi Kesalahan", {
        description: errorMessage,
      });
    },
  });
};
