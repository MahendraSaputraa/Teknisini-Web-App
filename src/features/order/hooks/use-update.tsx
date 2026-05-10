import { updateOrderStatus, assignTechnician } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateOrder({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }: any) => {
      if (payload.status) {
        return updateOrderStatus(id, payload.status);
      }
      if (payload.technician_id) {
        return assignTechnician(id, payload.technician_id);
      }
      return Promise.reject("Invalid payload");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-order"] });
      toast.success("Order berhasil diperbarui");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { update };
}
