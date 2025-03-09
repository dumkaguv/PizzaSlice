"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  className?: string;
}

export const ProductGroupVariants: React.FC<Props> = ({
  items,
  onClick,
  selectedValue,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between rounded-3xl bg-[#F3F3#F7] p-1 select-none",
        className,
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl px-5 text-sm transition-all duration-300",
            {
              "bg-white shadow": item.value === selectedValue,
              "pointer-events-none text-gray-500 opacity-50": item.disabled,
            },
            className,
          )}
          type="button"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
