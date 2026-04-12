import { deleteTechnician } from "@/services/technician";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTechnician({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: (id: any) => deleteTechnician(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-technician"] });
      toast.success(res.message || "Berhasil Membuat Teknisi");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { deleted };
}
