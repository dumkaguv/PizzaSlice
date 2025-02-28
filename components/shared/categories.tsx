import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const categories = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
  "Десерты",
];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1", className)}
    >
      {categories.map((category, index) => (
        <button
          className={cn(
            "hover:text-primary flex h-11 items-center rounded-2xl px-5 font-bold duration-200 hover:bg-white",
            activeIndex === index &&
              "text-primary bg-white shadow-md shadow-gray-200",
          )}
          key={index}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
