"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";
import { useCategoriesIntersectionObserver } from "@/shared/hooks";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const { activeIndex } = useCategoriesIntersectionObserver({ categories });

  return (
    <div
      className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1", className)}
    >
      {categories.map((category, index) => (
        <a
          href={`#category-${category.categoryId}`}
          className={cn(
            "hover:text-primary/90 flex h-11 items-center rounded-2xl px-5 font-bold duration-200 hover:bg-white/80",
            activeIndex === index &&
              "text-primary bg-white shadow-md shadow-gray-200",
          )}
          key={index}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};
