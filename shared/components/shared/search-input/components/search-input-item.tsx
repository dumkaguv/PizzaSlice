import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ProductWithItems } from "@/@types/prisma";
import { cn } from "@/shared/lib";
import { getIndexesOfSearchSubstring } from "../lib";

interface Props {
  product: ProductWithItems;
  searchQuery?: string;
  onLinkClick: () => void;
  className?: string;
}

export const SearchInputItem: React.FC<Props> = ({
  product,
  searchQuery = "",
  onLinkClick,
  className,
}) => {
  const { start, end } = getIndexesOfSearchSubstring(
    product.name.toLowerCase(),
    searchQuery.toLowerCase(),
  );

  return (
    <Link
      onClick={onLinkClick}
      href={`/product/${product.productId}`}
      className={cn(
        "hover:bg-primary/10 flex cursor-pointer items-center gap-3 px-3 py-2 max-lg:gap-2 max-m",
        className,
      )}
    >
      <Image src={product.imageUrl} width={40} height={40} alt="" />
      <span className="max-lg:text-sm">
        {start !== -1 ? (
          <>
            {product.name.slice(0, start)}
            <strong>{product.name.slice(start, end + 1)}</strong>
            {product.name.slice(end + 1)}
          </>
        ) : (
          product.name
        )}
      </span>
      <span className="text-sm text-[#858585] whitespace-nowrap">{product.items[0].price} L</span>
    </Link>
  );
};
