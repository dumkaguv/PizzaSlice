"use client";

import React, { useEffect } from "react";
import { Ingredient as IngredientType, ProductItem } from "@prisma/client";

import { cn, calcTotalPizzaPrice } from "@/shared/lib";
import { Ingredient, PizzaImage, ProductGroupVariants, Title } from ".";
import { Button } from "@/shared/components/ui";
import {
  mapPizzaType,
  PIZZA_TYPES,
  PizzaSize,
  PizzaType,
} from "@/shared/constants/pizza";
import { usePizzaOptions } from "@/shared/hooks";

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
  const {
    size,
    type,
    selectedIngredientIds,
    availablePizzas,
    availablePizzaSizes,
    toggleIngredient,
    setSize,
    setType,
  } = usePizzaOptions(items);

  const totalPrice = calcTotalPizzaPrice({
    items,
    ingredients,
    selectedIngredientIds,
    type,
    size,
  });

  const ingredientNames = ingredients
    .filter((ingredient) => selectedIngredientIds.has(ingredient.ingredientId))
    .map((ingredient) => ingredient.name.toLowerCase())
    .join(", ");

  const textDetails = `${size} см; ${mapPizzaType[type]} тесто
  ${ingredientNames.length > 0 ? `ингредиенты: ${ingredientNames}` : ""}`;

  const onAddClick = () => {
    const pizzaInfo = {
      size,
      type,
      ...(selectedIngredientIds.size > 0 && { selectedIngredientIds }),
      totalPrice,
    };
    console.log(pizzaInfo);
    onClickAddCart?.();
  };

  useEffect(() => {
    setSize((prevSize: PizzaSize) => {
      return availablePizzas.some((pizza) => prevSize === pizza.size)
        ? prevSize
        : (availablePizzas[0].size as PizzaSize);
    });
  }, [type]);

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} width={250} height={250} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="mt-5 flex flex-col gap-2">
          <ProductGroupVariants
            items={availablePizzaSizes}
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
        <Button
          onClick={onAddClick}
          className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
