import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cancelOrder } from "@/services/order";

export const useCancelOrder = (orderId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Pesanan berhasil dibatalkan");
      router.replace("/customer/order");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Pesanan tidak dapat dibatalkan",
      );
    },
  });
};
