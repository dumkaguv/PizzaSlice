"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Categories, Container, SortPopup } from "./";
import { Category } from "@prisma/client";
import { defineTopBarHeight } from "@/lib/utils";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  
  React.useEffect(() => {
    defineTopBarHeight();
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5",
        className,
      )}
      data-js-top-bar=""
    >
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
