import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const route = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      const { token: customToken, user } = res.data;

      try {
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();

        Cookies.set("access_token", idToken, { path: "/", expires: 7 });
        Cookies.set("role", user.role, { path: "/", expires: 7 });

        toast.success(res.message);

        await queryClient.invalidateQueries({ queryKey: ["current-user"] });

        const destination = user.role === "admin" ? "/admin/dashboard" : "/";
 

      window.location.href = destination;
      } catch (error) {
        toast.error("Gagal sinkronisasi sesi dengan Firebase.");
        console.error("Firebase Login Error:", error);
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
};