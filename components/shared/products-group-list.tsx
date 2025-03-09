import React from "react";
import { cn } from "@/lib/utils";

import { ProductCard, Title } from "./";
import { Product } from "@prisma/client";

interface Props {
  title: string;
  items: Product[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ ...props }) => {
  const { title, items, categoryId, className, listClassName } = props;

  return (
    <div id={`category-${categoryId}`} className={className}>
      <Title text={title} size="lg" className="mb-5 font-extrabold" />

      <ul className={cn("grid grid-cols-3 gap-10", listClassName)}>
        {items.map((item) => (
          <li key={item.productId} className="flex flex-col">
            <ProductCard
              id={item.productId}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.items[0].price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
