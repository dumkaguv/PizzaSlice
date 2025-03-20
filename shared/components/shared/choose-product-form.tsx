import React from "react";
import Image from "next/image";

import { cn } from "@/shared/lib/utils";
import { Title } from ".";
import { Button } from "@/shared/components/ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  onClickAdd,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <div className="relative flex w-full flex-1 items-center justify-center">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt=""
          className="relative top-2 left-2 z-10 h-[350px] w-[350px] transition-all duration-300"
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">Details...</p>

        <Button className="h-[55px] w-full rounded-[18px] px-10 text-base mt-10">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
