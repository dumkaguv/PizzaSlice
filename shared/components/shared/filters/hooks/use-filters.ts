import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPizzaTypes: (key: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setPrices: (key: "priceFrom" | "priceTo", value: string | number) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") || []),
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || []),
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || []),
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const handleInputChange = (
    key: "priceFrom" | "priceTo",
    value: string | number,
  ) => {
    const numValue = value === "" ? 0 : Number(value);

    setPrices((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(numValue, 1000)),
    }));
  };

  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
      setPrices: handleInputChange,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices],
  );
};
