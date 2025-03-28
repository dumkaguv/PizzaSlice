import React from "react";

import { CheckoutItem, WhiteBlock } from "@/shared/components/shared";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "../../cart/lib";
import { CartStateItem } from "@/shared/lib/cart/get-cart-details";

interface Props {
  items: CartStateItem[];
  onCountButtonClick: (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => void;
  removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onCountButtonClick,
  removeCartItem
}) => {
  return (
    <WhiteBlock title="1. Корзина" contentClassName="flex flex-col gap-5">
      {items.map((item) => (
        <CheckoutItem
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          details={getCartItemDetails(
            item.ingredients,
            item.pizzaType as PizzaType,
            item.pizzaSize as PizzaSize,
          )}
          disabled={item.disabled}
          onCountButtonClick={(type) =>
            onCountButtonClick(item.id, item.quantity, type)
          }
          onRemoveItemClick={() => removeCartItem(item.id)}
        />
      ))}
    </WhiteBlock>
  );
};
