import React from "react";

import { Checkbox } from "@/shared/components/ui";

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className="flex w-fit items-center space-x-2 hover:text-primary transition-colors duration-100">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="h-6 w-6 rounded-[8px] bg-neutral-50"
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className="flex-1 leading-none"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
