import React from "react";
import Image from "next/image";

import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  isLoading?: boolean;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  isLoading,
  onClickAdd,
  className,
}) => {
  return (
    <div className={cn("flex lg:flex-1 max-lg:flex-col max-lg:items-center", className)}>
      <div className="relative flex w-full flex-1 items-center justify-center">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt=""
          className="relative max-md:h-[280px] max-md:w-[280px] top-2 left-2 z-10 h-[350px] w-[350px] transition-all duration-300"
        />
      </div>

      <div className="w-[490px] max-md:w-[360px] bg-[#FCFCFC] p-7 max-md:p-4">
        <Title text={name} size="md" className="mb-1 font-extrabold max-md:text-[22px]" />

        <p className="text-gray-400 max-md:text-[14px]">Details...</p>

        <Button
          isLoading={isLoading}
          onClick={() => onClickAdd?.()}
          className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
