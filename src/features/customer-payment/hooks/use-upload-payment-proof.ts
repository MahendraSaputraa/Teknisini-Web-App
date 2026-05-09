import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadPaymentProof } from "@/services/order";
import { uploadPaymentProof as uploadToCloudinary } from "@/services/upload";
import { useRouter } from "next/navigation";

export interface UseUploadPaymentProofParams {
  orderId: string;
  onSuccess?: () => void;
}

export const useUploadPaymentProof = ({
  orderId,
  onSuccess,
}: UseUploadPaymentProofParams) => {
  const route = useRouter();
  return useMutation({
    mutationFn: async (file: File) => {
      // Step 1: Upload file ke Cloudinary via /api/upload
      toast.loading("Mengunggah bukti pembayaran...");
      const paymentProofUrl = await uploadToCloudinary(file);

      // Step 2: Kirim URL Cloudinary ke PATCH /orders/:id
      const response = await uploadPaymentProof(orderId, paymentProofUrl);

      return response;
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Bukti Pembayaran Berhasil", {
        description:
          "Bukti pembayaran Anda telah diunggah dan sedang diverifikasi.",
      });
      route.push(`customer/order/status/${orderId}`);
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
