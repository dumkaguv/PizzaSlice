import React from "react";

import { cn } from "@/lib/utils";
import { PizzaImage, Title } from ".";
import { Button } from "@/components/ui";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={30} width={250} height={250} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">Details...</p>

        <Button className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">
          Добавить в корзину за ₽
        </Button>
      </div>
    </div>
  );
};
