import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import React from "react";

type Option = {
  label: string;
  value: string;
};

export interface FormSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  containerClassName?: string;
  className?: string;
  onSelectExtra?: () => void;
}

export function FormSelect({
  label,
  name,
  placeholder = "Select option",
  options,
  required,
  onChange,
  value,
  error,
  disabled = false,
  containerClassName,
  className,
  onSelectExtra,
}: FormSelectProps) {
  return (
    <Field className={containerClassName}>
      <FieldLabel htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>

      <Select
        disabled={disabled}
        value={value}
        onValueChange={(val) => {
          onChange?.(val);
          onSelectExtra?.();
        }}
      >
        <SelectTrigger
          id={name}
          className={cn(
            "h-11",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <FieldDescription className="text-destructive text-sm font-medium">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}
