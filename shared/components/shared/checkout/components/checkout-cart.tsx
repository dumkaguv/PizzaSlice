"use client";

import React from "react";
import {
  CheckoutItem,
  CheckoutItemSkeleton,
  WhiteBlock,
} from "@/shared/components/shared";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "../../cart/lib";
import { CartStateItem } from "@/shared/lib/cart/get-cart-details";

interface Props {
  items: CartStateItem[];
  isLoading?: boolean;
  onCountButtonClick: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  isLoading,
  onCountButtonClick,
  removeCartItem,
}) => {
  const [showSkeletons, setShowSkeletons] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      setShowSkeletons(false);
    }
  }, [isLoading]);

  console.log(showSkeletons)

  return (
    <WhiteBlock title="1. Корзина" contentClassName="flex flex-col gap-5 max-sm:p-2.5">
      {showSkeletons && [...Array(4)].map((_, index) => (
        <CheckoutItemSkeleton key={index} className="h-20" />
      ))}

      {!showSkeletons &&
        items.length > 0 &&
        items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            productId={item.productId}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            details={getCartItemDetails(
              item.ingredients,
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize
            )}
            disabled={item.disabled}
            onCountButtonClick={(type) =>
              onCountButtonClick(item.id, item.quantity, type)
            }
            onRemoveItemClick={() => removeCartItem(item.id)}
          />
        ))}

        {items.length === 0 && !showSkeletons && "Ваша корзина пуста. Добавьте продукты в корзину."}
    </WhiteBlock>
  );
};
