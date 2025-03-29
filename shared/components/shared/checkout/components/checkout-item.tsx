"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { CartItemProps } from "@/shared/components/shared/cart/components/cart-item-details/cart-item-details-types";
import * as CartItemDetails from "@/shared/components/shared/cart/components/cart-item-details";

interface Props extends CartItemProps {
  onCountButtonClick?: (type: "plus" | "minus") => void;
  onRemoveItemClick?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onCountButtonClick,
  onRemoveItemClick,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "pointer-events-none opacity-50": disabled,
        },
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-5">
        <CartItemDetails.Image src={imageUrl} />

        <CartItemDetails.Info
          name={name}
          details={details}
          className="max-w-2xs"
        />
      </div>

      <CartItemDetails.Price price={price} />

      <div className="ml-20 flex items-center gap-5">
        <CartItemDetails.CountButton
          onClick={onCountButtonClick}
          value={quantity}
        />
        <button type="button" onClick={onRemoveItemClick}>
          <X
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
