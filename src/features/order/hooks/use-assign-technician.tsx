import { assignTechnician } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAssignTechnician({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const assign = useMutation({
    mutationFn: ({ id, technicianId }: any) =>
      assignTechnician(id, technicianId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-order"] });
      toast.success("Teknisi berhasil di-assign");
      onSuccessCallback?.(res?.data);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Gagal assign teknisi";
      toast.error(message);
    },
  });

  return { assign };
}
