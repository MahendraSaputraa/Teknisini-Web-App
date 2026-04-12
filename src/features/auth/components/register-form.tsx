"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useRegister } from "../hooks/use-register";
import { registerSchema } from "../schema";
import { FormInput } from "@/components/form-components/form-input";
import { Spinner } from "@/components/ui/spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const mutation = useRegister();
  const [errors, setErrors] = useState<any>({});
  const [registerPayload, setRegisterPayload] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("error", errors);

    const result = registerSchema.safeParse(registerPayload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate(registerPayload);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Daftar akun baru TekniSini
                </p>
              </div>
              <FormInput
                label="Nama"
                name="name"
                type="text"
                placeholder="Ide bagus"
                required
                value={registerPayload.name}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                error={errors?.name?.[0]}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={registerPayload.email}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                error={errors?.email?.[0]}
              />
              <FormInput
                label="Telfun"
                name="phone"
                type="number"
                placeholder="0089123456788"
                required
                value={registerPayload.phone}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                error={errors?.phone?.[0]}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                required
                value={registerPayload.password}
                onChange={(e) =>
                  setRegisterPayload((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                error={errors?.password?.[0]}
              />

              <Field>
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? <Spinner /> : "Sigin"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
