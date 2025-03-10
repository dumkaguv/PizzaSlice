import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
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

  const formattedIngredients = ingredients.map((ingredient) => ({
    value: ingredient.ingredientId.toString(),
    text: ingredient.name,
  }));

  return { ingredients, isLoading, formattedIngredients };
};
