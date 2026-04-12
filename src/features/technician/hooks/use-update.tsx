import { updateTechnician } from "@/services/technician";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUser({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }: any) => updateTechnician(id, payload),
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

  return { update };
}
