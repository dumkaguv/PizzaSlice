import React from "react";
import { cn } from "@/shared/lib/utils";

import { ProductCard, Title } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ ...props }) => {
  const { title, items, categoryId, className, listClassName } = props;

  return (
    <div id={`category-${categoryId}`} className={className}>
      <Title text={title} size="lg" className="mb-5 font-extrabold" />

      <ul className={cn("grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-xl:gap-6 max-[900px]:!grid-cols-1", listClassName)}>
        {items.map((item) => (
          <li key={item.productId} className="flex flex-col">
            <ProductCard
              id={item.productId}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.items[0].price}
              ingredients={item.ingredients}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
