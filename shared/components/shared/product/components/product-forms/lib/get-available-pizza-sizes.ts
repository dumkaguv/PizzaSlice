import { ProductItem } from "@prisma/client";

import { PIZZA_SIZES_TEXT, PizzaType } from "@/shared/constants/pizza";

/**
 * Retrieves available pizza sizes and their availability based on the selected pizza type.
 *
 * @param {ProductItem[]} items - An array of product items representing pizzas.
 * @param {PizzaType} type - The type of pizza to filter by.
 * @returns {Object} An object containing:
 *   - availablePizzas: An array of pizzas that match the given type.
 *   - availablePizzaSizes: An array of size objects with text, value, and disabled status,
 *     indicating whether each size is available for the selected pizza type.
 */

export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType,
) => {
  const availablePizzas = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = PIZZA_SIZES_TEXT.map((item) => ({
    text: item.text,
    value: item.value,
    disabled: !availablePizzas.some(
      (pizza) => Number(pizza.size) === Number(item.value),
    ),
  }));

  return { availablePizzas, availablePizzaSizes };
};
