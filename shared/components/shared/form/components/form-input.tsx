import React from "react";

import { RequiredSymbol } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";
import { ErrorText } from "./error-text";

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
  return (
    <div className={className}>
      {label && (
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input isShowIconClear={true} className="text-md h-12" {...props} />
      </div>

      <ErrorText text="Поле обязательное для заполнения" className="mt-2" />
    </div>
  );
};
