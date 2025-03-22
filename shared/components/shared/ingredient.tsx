import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Ingredient: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  active,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md transition-transform duration-200 hover:scale-[1.025]",
        { "border-primary border": active },
        className,
      )}
      onClick={onClick}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter") onClick?.();
      }}
      tabIndex={0}
    >
      {active && (
        <CircleCheck className="text-primary absolute top-2 right-2" />
      )}
      <Image src={imageUrl} width={110} height={110} alt="" />
      <span className="mb-1 text-xs">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
