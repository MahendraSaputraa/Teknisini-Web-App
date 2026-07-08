"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { loginSchema } from "../schema";
import { useLogin } from "../hooks/use-login";
import { FormInput } from "@/components/form-components/form-input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export function LoginForm({
  className,
  callbackUrl,
  ...props
}: React.ComponentProps<"div"> & { callbackUrl?: string }) {
  const mutation = useLogin(callbackUrl);
  const [errors, setErrors] = useState<any>({});
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("error", errors);

    const result = loginSchema.safeParse(loginPayload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate(loginPayload);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Selamat Datang Kembali</h1>
                <p className="text-balance text-muted-foreground">
                  Masuk ke akun TekniSini
                </p>
              </div>
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={loginPayload.email}
                onChange={(e) =>
                  setLoginPayload((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                error={errors?.email?.[0]}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                required
                value={loginPayload.password}
                onChange={(e) =>
                  setLoginPayload((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                error={errors?.password?.[0]}
              />

              <Field>
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? <Spinner /> : "Masuk"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Belum punya akun?{" "}
                <Link
                  href={
                    callbackUrl
                      ? `/register?callbackUrl=${encodeURIComponent(callbackUrl)}`
                      : "/register"
                  }
                >
                  Daftar disini
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/image-login.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Dengan mengeklik lanjutkan, Anda menyetujui{" "}
        <a href="#">Ketentuan Layanan</a> dan <a href="#">Kebijakan Privasi</a>{" "}
        kami.
      </FieldDescription>
    </div>
  );
}
