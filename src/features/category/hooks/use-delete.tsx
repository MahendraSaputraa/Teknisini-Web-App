import { deleteCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCategory({ onSuccessCallback }: any = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: (id: any) => deleteCategory(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-category"] });
      toast.success(res.message || "Kategori berhasil dihapus");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { deleted };
}
