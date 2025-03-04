import React from "react";

import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";

interface ReturnProps {
  ingredients: Ingredient[];
  isLoading: boolean;
}
export const UseFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        setIngredients(await Api.ingredients.getAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, isLoading };
};
