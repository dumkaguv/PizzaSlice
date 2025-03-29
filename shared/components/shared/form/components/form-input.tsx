"use client";

import React from "react";

import { RequiredSymbol } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";
import { ErrorText } from "./error-text";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input {...register(name)} className="text-md h-12" {...props} />
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
