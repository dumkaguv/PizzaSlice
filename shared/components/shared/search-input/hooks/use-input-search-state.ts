import { useState } from "react";
import { useDebounce } from "react-use";

import { ProductWithItems } from "@/@types/prisma";
import { Api } from "@/shared/services/api-client";

interface ReturnProps {
  products: ProductWithItems[];
  isLoading: boolean;
  setProducts: (value: ProductWithItems[]) => void;
  setIsLoading: (value: boolean) => void;
}

/**
 * Custom hook to manage the state of product search results.
 *
 * Initiates a debounced search query to fetch products from the API based on the provided search query.
 * The results are stored in the `products` state, and the loading state is managed via `isLoading`.
 *
 * @param searchQuery - The search query string used to fetch products.
 * @returns An object containing:
 *   - `products`: An array of `ProductWithItems` representing search results.
 *   - `isLoading`: A boolean indicating if the search is in progress.
 *   - `setProducts`: A function to manually update the `products` state.
 *   - `setIsLoading`: A function to manually update the `isLoading` state.
 *
 * @example
 * const { products, isLoading } = useInputSearchState("pizza");
 * 
 * // Triggers a search for "pizza" and updates `products` and `isLoading` accordingly.
 */

export const useInputSearchState = (searchQuery: string): ReturnProps => {
  const [products, setProducts] = useState<ProductWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useDebounce(
    async () => {
      try {
        setIsLoading(true);
        setProducts(await Api.products.search(searchQuery));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    250,
    [searchQuery],
  );

  return { products, isLoading, setProducts, setIsLoading };
};
