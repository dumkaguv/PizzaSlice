"use client";

import React, { FC, useLayoutEffect } from "react";

import { cn } from "@/shared/lib/utils";
import {
  Categories,
  Container,
  FiltersMobile,
  SortPopup,
} from "@/shared/components/shared";
import { Category } from "@prisma/client";
import { defineTopBarHeight } from "../lib";
import { ListFilterPlus } from "lucide-react";

import { useWindowSize } from "react-use";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: FC<Props> = ({ className, categories }) => {
  const isMobile = useWindowSize().width < 767;

  useLayoutEffect(() => {
    defineTopBarHeight();
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5 max-md:py-1",
        className,
      )}
      data-js-top-bar=""
    >
      <Container className="flex items-center gap-6 overflow-x-auto max-md:gap-3 max-md:text-sm md:justify-between">
        {isMobile && (
          <>
            <FiltersMobile
              trigger={
                <button type="button">
                  <ListFilterPlus size={32} className="cursor-pointer" />
                </button>
              }
            />
          </>
        )}
        <Categories categories={categories} />
        {!isMobile && <SortPopup />}
      </Container>
    </div>
  );
};
