import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  containerClassName?: string;
  required?: boolean;
}

export function FormInput({
  label,
  name,
  error,
  containerClassName,
  className,
  required,
  ...props
}: FormInputProps) {
  return (
    <Field className={containerClassName}>
      <FieldLabel htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>

      <Input
        id={name}
        name={name}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        {...props}
      />

      {error && (
        <FieldDescription className="text-destructive text-sm font-medium">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}
