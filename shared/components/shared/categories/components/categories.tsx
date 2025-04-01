"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { useCategoriesIntersectionObserver } from "../hooks";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const { activeIndex } = useCategoriesIntersectionObserver({ categories });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current && categoryRefs.current[activeIndex]) {
      const container = containerRef.current;
      const activeCategory = categoryRefs.current[activeIndex];

      if (activeCategory) {
        container.scrollTo({
          left:
            activeCategory.offsetLeft -
            container.offsetWidth / 1.5 +
            activeCategory.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-flex max-w-[550px] gap-1 overflow-x-auto rounded-2xl bg-gray-50 p-1",
        className,
      )}
    >
      {categories.map((category, index) => (
        <a
          ref={(el) => {
            categoryRefs.current[index] = el;
          }}
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
