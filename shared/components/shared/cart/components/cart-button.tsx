"use client";

import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { Button } from "@/shared/components/ui";
import { CartDrawer } from "@/shared/components/shared";
import { useCartStore } from "@/shared/store/cart";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/shared/lib";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, isLoading, items] = useCartStore(
    useShallow((state) => [state.totalAmount, state.isLoading, state.items]),
  );

  return (
    <CartDrawer className={className}>
      <Button
        isLoading={isLoading}
        className={cn("group relative", { "w-[130px]": isLoading }, className)}
      >
        <b>{totalAmount} ₽</b>
        <span className="mx-3 h-full w-[1px] bg-white/30" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  );
};
