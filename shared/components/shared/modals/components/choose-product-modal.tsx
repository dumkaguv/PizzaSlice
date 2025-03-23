"use client";

import React from "react";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, isLoading] = useCartStore(
    useShallow((state) => [state.addCartItem, state.isLoading]),
  );

  const onAddProduct = async (
    productItemId?: number,
    ingredients?: number[],
  ) => {
    try {
      const itemId = productItemId ?? firstItem.productItemId;

      await addCartItem({
        productItemId: itemId,
        ingredientsIds: ingredients,
      });

      toast.success(`${product.name} успешно добавлен в корзину!`);
      router.back();
    } catch (e) {
      toast.error(`${product.name} не удалось добавить в корзину.`);
      console.error(e);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-5xl !max-w-5xl overflow-hidden bg-white p-0",
          className,
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onClickAddCart={onAddProduct}
            isLoading={isLoading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onClickAdd={onAddProduct}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
