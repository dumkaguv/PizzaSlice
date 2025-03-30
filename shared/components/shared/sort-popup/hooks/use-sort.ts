"use client";

import { useState, useEffect, SetStateAction } from "react";
import qs from "qs";
import { SORT_OPTIONS } from "../constants/sortOptions";
import { useRouter } from "next/navigation";

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const useSort = () => {
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [currentParams, setCurrentParams] = useState<Record<string, string>>(
    {},
  );

  console.log(selectedVariant);

  useEffect(() => {
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    const isSortByInURL = Object.keys(params).includes("sortBy");

    if (!isSortByInURL) {
      return;
    }

    setCurrentParams(
      params as unknown as SetStateAction<Record<string, string>>,
    );
    setSelectedVariant(
      SORT_OPTIONS.findIndex(({ value }) => value === params.sortBy),
    );
  }, []);

  const onSortOptionClick = (sortBy: SortValue) => {
    const newParams = qs.stringify(
      { ...currentParams, sortBy },
      { arrayFormat: "comma" },
    );

    router.push(`?${newParams}`, { scroll: false });

    setSelectedVariant(SORT_OPTIONS.findIndex(({ value }) => value === sortBy));
  };

  return {
    selectedVariant,
    onSortOptionClick,
  };
};
