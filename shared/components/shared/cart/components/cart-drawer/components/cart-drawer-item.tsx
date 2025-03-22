import React from "react";

import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "../../cart-item-details/cart-item-details-types";
import * as CartItem from "../../cart-item-details";
import { CountButton } from "@/shared/components/shared";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-6 bg-white p-5", className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={(type) => console.log(type)} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price price={price} />
            <Trash2Icon
              tabIndex={0}
              size={16}
              className="cursor-pointer text-gray-400 hover:text-gray-600 duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
