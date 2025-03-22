import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[],
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} тесто, ${pizzaSize} см.`);
  }

  if (ingredients && ingredients.length > 0) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
