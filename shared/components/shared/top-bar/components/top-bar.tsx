"use client";

import React, { FC, useLayoutEffect } from "react";

import { cn } from "@/shared/lib/utils";
import { Categories, Container, SortPopup } from "@/shared/components/shared";
import { Category } from "@prisma/client";
import { defineTopBarHeight } from "../lib";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: FC<Props> = ({ className, categories }) => {
  
  useLayoutEffect(() => {
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
