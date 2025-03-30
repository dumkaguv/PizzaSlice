import React from "react";
import Image from "next/image";

import { cn } from "@/shared/lib";

interface Props {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({
  src,
  width = 65,
  height = 65,
  alt = "",
  className
}) => {
  return (
    <Image
      src={src} // "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
      className={cn("mr-5 h-[65px] w-[65px] shrink-0 max-sm:w-[55px] h-auto", className)}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
