"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit }) => {
  const [addCartItem, isLoading] = useCartStore(
    useShallow((state) => [state.addCartItem, state.isLoading]),
  );
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

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
      onSubmit?.()
    } catch (e) {
      toast.error(`${product.name} не удалось добавить в корзину.`);
      console.error(e);
    }
  };

  return (
    <>
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
    </>
  );
};
