import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/cart/get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} тесто, ${pizzaSize} см`);
  }

  if (ingredients && ingredients.length > 0) {
    details.push(...ingredients.map((ingredient) => ingredient.name.toLowerCase()));
  }

  return details.join(", ");
};
