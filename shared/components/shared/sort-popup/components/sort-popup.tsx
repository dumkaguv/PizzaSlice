"use client";

import React, { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Popover } from "@/shared/components/ui";
import { PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { SORT_OPTIONS } from "../constants/sortOptions";
import { useSort } from "../hooks";
import { SortValue } from "../hooks/use-sort";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const { selectedVariant, onSortOptionClick } = useSort();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortOptionClick = (value: SortValue) => {
    setIsOpen(false);
    onSortOptionClick(value);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "inline-flex h-[52px] min-w-[255px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5 duration-200 hover:bg-gray-200/50",
            className,
          )}
          tabIndex={0}
        >
          <ArrowUpDown size={16} />
          <b>Сортировка:</b>
          <b className="text-primary">{SORT_OPTIONS[selectedVariant]?.name }</b>
        </div>
      </PopoverTrigger>
      {isOpen && (
        <PopoverContent sideOffset={8} className="max-w-[255px] bg-white">
          <ul className="grid gap-2.5">
            {SORT_OPTIONS.map(({ name, value }, index) => (
              <li className="h-full" key={index}>
                <button
                  onClick={() => handleSortOptionClick(value)}
                  className="hover:text-primary w-full text-left duration-200"
                  type="button"
                >
                  {name ?? ""}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SortPopup;
