"use client";

import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "../";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

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
            ingredients={[]}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
