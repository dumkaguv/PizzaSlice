"use client";

import { useEffect } from "react";
import qs from "qs";  
import { useRouter } from "next/navigation";

import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  
  useEffect(() => {
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
  }, [filters.pizzaTypes, filters.prices, filters.selectedIngredients, filters.sizes, router]);
};
