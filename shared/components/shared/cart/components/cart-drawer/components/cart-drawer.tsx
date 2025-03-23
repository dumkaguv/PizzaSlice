"use client";

import React, { useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn, getCorrectEnding } from "@/shared/lib";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "../../../lib";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useShallow } from "zustand/react/shallow";
import { EmptyCart } from "./empty-cart";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const {
    items,
    totalAmount,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      totalAmount: state.totalAmount,
      fetchCartItems: state.fetchCartItems,
      updateItemQuantity: state.updateItemQuantity,
      removeCartItem: state.removeCartItem,
    })),
  );

  const onCountButtonClick = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          className,
          "flex flex-col justify-between bg-[#F4F1EE] pb-0",
        )}
      >
        <SheetHeader>
          <SheetTitle>
            {items.length > 0 && (
              <>
                В корзине{" "}
                <span className="font-bold">
                  {items.length} {getCorrectEnding(items.length, "товар")}
                </span>
              </>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <div className="grid gap-2 overflow-y-auto">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize,
                        item.ingredients,
                      )
                    : ""
                }
                onCountButtonClick={(type) =>
                  onCountButtonClick(item.id, item.quantity, type)
                }
                onRemoveItemClick={() => removeCartItem(item.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyCart />
        )}

        {items.length > 0 && (
          <SheetFooter className="bg-white p-8">
            <div className="w-full">
              <div className="mb-4 flex">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                </span>

                <span className="text-lg font-bold">{totalAmount} ₽</span>
              </div>

              <Link href="/checkout">
                <Button type="submit" className="h-12 w-full text-base">
                  Оформить заказ
                  <ArrowRight className="ml-2 w-5" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
