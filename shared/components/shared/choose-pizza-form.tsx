"use client";

import React, { useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Ingredient, PizzaImage, ProductGroupVariants, Title } from ".";
import { Button } from "@/shared/components/ui";
import {
  PIZZA_SIZES_TEXT,
  PIZZA_TYPES,
  PizzaSize,
  PizzaType,
} from "@/shared/constants/pizza";
import { Ingredient as IngredientType, ProductItem } from "@prisma/client";
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: IngredientType[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredientIds, { toggle: toggleIngredient }] = useSet(
    new Set<number>([]),
  );

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} width={250} height={250} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">Details...</p>

        <div className="mt-5 flex flex-col gap-2">
          <ProductGroupVariants
            items={PIZZA_SIZES_TEXT}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <ProductGroupVariants
            items={PIZZA_TYPES}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="scrollbar mt-8 h-[420px] overflow-auto rounded-md bg-gray-50 p-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.ingredientId}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredientIds.has(ingredient.ingredientId)}
                onClick={() => toggleIngredient(ingredient.ingredientId)}
              />
            ))}
          </div>
        </div>
        <Button className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">
          Добавить в корзину за ₽
        </Button>
      </div>
    </div>
  );
};
