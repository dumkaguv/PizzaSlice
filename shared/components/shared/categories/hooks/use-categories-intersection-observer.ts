"use client";

import React from "react";

import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
}

export const useCategoriesIntersectionObserver = ({ categories }: Props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(
              categories.findIndex(
                (category) =>
                  `category-${category.categoryId}` === entry.target.id,
              ),
            );
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    const categoryElements = categories
      .map((categoryElement) => {
        return document.getElementById(
          `category-${categoryElement.categoryId}`,
        );
      })
      .filter((el) => el !== null);

    categoryElements.forEach((el) => observer.observe(el));

    return () => {
      categoryElements.forEach((el) => observer.unobserve(el));
    };
  }, [categories]);

  return {
    activeIndex,
    setActiveIndex,
  };
};
