import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { Button } from "@/shared/components/ui";
import { CartDrawer } from "@/shared/components/shared";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <CartDrawer className={className}>
      <Button className="group relative">
        <b>0 ₽</b>
        <span className="mx-3 h-full w-[1px] bg-white/30" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>0</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  );
};
