import { createTechnician } from "@/services/technician";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTechnician({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createTechnician,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-technician"] });
      toast.success(res.message);

      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { create };
}
