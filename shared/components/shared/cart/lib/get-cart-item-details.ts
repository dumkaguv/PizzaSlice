import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/cart/get-cart-details";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: CartStateItem["ingredients"],
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
