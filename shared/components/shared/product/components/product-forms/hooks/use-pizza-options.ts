import { useEffect, useState } from "react";
import { ProductItem } from "@prisma/client";

import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredientIds: Set<number>;
  availablePizzas: ProductItem[];
  availablePizzaSizes: {
    text: "Маленькая" | "Средняя" | "Большая";
    value: string;
    disabled: boolean;
  }[];
  toggleIngredient: (id: number) => void;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(items[0].size as PizzaSize);
  const [type, setType] = useState<PizzaType>(items[0].pizzaType as PizzaType);
  const [selectedIngredientIds, { toggle: toggleIngredient }] = useSet(
    new Set<number>([]),
  );

  const { availablePizzas, availablePizzaSizes } = getAvailablePizzaSizes(
    items,
    type,
  );

  useEffect(() => {
    setSize((prevSize) => {
      if (availablePizzas.some((pizza) => prevSize === pizza.size)) {
        return prevSize;
      } else {
        return availablePizzas[0].size as PizzaSize;
      }
    });
  }, [type]);

  return {
    size,
    type,
    selectedIngredientIds,
    availablePizzas,
    availablePizzaSizes,
    toggleIngredient,
    setSize,
    setType,
  };
};
