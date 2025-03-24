"use client";

import qs from "qs";
import { useRouter } from "next/navigation";

import { Filters } from "./use-filters";
import { useDebounce } from "react-use";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useDebounce(
    () => {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${query}`, { scroll: false });
    },
    300,
    [
      filters.pizzaTypes,
      filters.prices,
      filters.selectedIngredients,
      filters.sizes,
      router,
    ],
  );
};
