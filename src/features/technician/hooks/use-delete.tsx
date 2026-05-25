import { deleteTechnician } from "@/services/technician";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTechnician({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: (id: string) => deleteTechnician(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-technician"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      toast.success("Teknisi berhasil dihapus");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { deleted };
}
