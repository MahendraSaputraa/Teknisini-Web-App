import { register } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export const useRegister = (callbackUrl?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: async (res) => {
      const { token: customToken, user } = res.data;

      try {
        const userCredential = await signInWithCustomToken(auth, customToken);

        const idToken = await userCredential.user.getIdToken();

        const cookieOptions = {
          path: "/",
          expires: 7,
          sameSite: "lax" as const,
          secure: window.location.protocol === "https:",
        };
        Cookies.set("access_token", idToken, cookieOptions);
        Cookies.set("role", user.role, cookieOptions);

        toast.success(res.message);

        await queryClient.invalidateQueries({ queryKey: ["current-user"] });

        const safeCallbackUrl =
          callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
            ? callbackUrl
            : null;
        const destination =
          user.role === "admin"
            ? "/admin/dashboard"
            : (safeCallbackUrl ?? "/");

        window.location.replace(destination);
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
