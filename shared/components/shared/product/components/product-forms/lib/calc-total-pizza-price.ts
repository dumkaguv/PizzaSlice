import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

type Params = {
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredientIds: Set<number>;
  type: PizzaType;
  size: PizzaSize;
};

/**
 * Calculate the total price of a pizza based on the selected type, size, and ingredients.
 *
 * @example 
 * const totalPrice = calcTotalPizzaPrice({
 *   items,
 *   ingredients,
 *   selectedIngredientIds,
 *   type,
 *   size 
 * })
 * 
 * @param {Params} params - An object containing the following properties:
 *   - items: An array of product items.
 *   - ingredients: An array of ingredients.
 *   - selectedIngredientIds: A set of ingredient IDs that are selected.
 *   - type: The type of pizza.
 *   - size: The size of the pizza.
 *
 * @returns {number} The total price of the pizza.
 */
export const calcTotalPizzaPrice = ({
  items,
  ingredients,
  selectedIngredientIds,
  type,
  size,
}: Params) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price ?? 0;
  const ingredientsPrice = ingredients.reduce((totalPrice, ingredient) => {
    if (selectedIngredientIds.has(ingredient.ingredientId)) {
      totalPrice += Number(ingredient.price);
    }
    return totalPrice;
  }, 0);

  return pizzaPrice + ingredientsPrice;
};
