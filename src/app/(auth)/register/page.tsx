import { Metadata } from "next";
import { SignupForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description: "Daftar akun TekniSini sekarang dan dapatkan layanan teknisi panggilan terbaik di Bali dengan mudah.",
};

export default async function RegisterPage({
  searchParams,
}: PageProps<"/register">) {
  const { callbackUrl } = await searchParams;
  return (
    <SignupForm
      callbackUrl={typeof callbackUrl === "string" ? callbackUrl : undefined}
    />
  );
}
