import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Masuk ke akun TekniSini Anda untuk memesan teknisi dan memantau pesanan Anda.",
};

export default function LoginPage() {
  return <LoginForm />;
}
