import { deleteService } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteService({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: (id: any) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-service"] });
      toast.success("Layanan berhasil dihapus");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { deleted };
}
