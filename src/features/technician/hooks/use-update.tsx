import { updateTechnician } from "@/services/technician";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateTechnician({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }: any) => updateTechnician(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-technician"] });
      toast.success("Teknisi berhasil diperbarui");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { update };
}
