import React from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  price: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ price, className }) => {
  return <span className={cn("font-bold", className)}>{price} ₽</span>;
};
