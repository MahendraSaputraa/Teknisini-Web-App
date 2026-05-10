import { updateService } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateService({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }: any) => updateService(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-service"] });
      toast.success("Layanan berhasil diperbarui");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { update };
}
