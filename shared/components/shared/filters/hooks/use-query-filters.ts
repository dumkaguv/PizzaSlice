"use client";

import qs from "qs";
import { useRouter } from "next/navigation";

import { Filters } from "./use-filters";
import { useDebounce } from "react-use";
import { useRef } from "react";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useDebounce(
    () => {
      if (isMounted.current) {
        const currentParams = qs.parse(window.location.search, {
          ignoreQueryPrefix: true,
        });

        const params = {
          ...currentParams,
          ...filters.prices,
          pizzaTypes: Array.from(filters.pizzaTypes),
          sizes: Array.from(filters.sizes),
          ingredients: Array.from(filters.selectedIngredients),
        };

        const query = qs.stringify(params, {
          arrayFormat: "comma",
        });

        router.push(`?${query}`, { scroll: false });
      }

      isMounted.current = true;
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
