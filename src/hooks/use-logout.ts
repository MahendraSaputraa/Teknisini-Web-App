import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut(auth);

      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("role", { path: "/" });
    },
    onSuccess: () => {
      queryClient.clear();

      toast.success("Logout berhasil");

      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout Error:", error);
      toast.error("Terjadi kesalahan saat logout");
    },
  });
};
