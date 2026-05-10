import { createService } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateService({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-service"] });
      toast.success("Layanan berhasil dibuat");

      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { create };
}
