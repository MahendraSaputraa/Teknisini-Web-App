import { register } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const route = useRouter();

  return useMutation({
    mutationFn: register,
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
        route.push(destination);
      } catch (error) {
        toast.error("Gagal melakukan autentikasi dengan Firebase.");
        console.error("Firebase Auth Error:", error);
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
};