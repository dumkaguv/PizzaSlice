import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
  const ingredientsPrice = item.ingredients.reduce(
    (totalPrice, ingredient) => (totalPrice += ingredient.price),
    0,
  );
  const itemPrice = item.productItem.price;

  return (ingredientsPrice + itemPrice) * item.quantity;
};
