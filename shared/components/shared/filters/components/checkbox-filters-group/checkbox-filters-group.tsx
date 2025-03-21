"use client";

import React from "react";

import { Title } from "@/shared/components/shared";
import { FilterCheckbox } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";
import { FilterCheckboxProps } from "@/shared/components/shared/filters/components/filter-checkbox";
import { SkeletonCheckboxFiltersGroup } from "./skeleton-checkbox-filter-group";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  isLoading?: boolean;
  searchInputPlaceholder?: string;
  onCheckboxClick?: (id: string) => void;
  selectedValues?: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({ ...props }) => {
  const {
    title,
    items,
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    isLoading,
    onCheckboxClick,
    name,
    selectedValues,
    className,
  } = props;

  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  if (isLoading) {
    return <SkeletonCheckboxFiltersGroup title={title} limit={limit} />;
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : items.slice(0, limit);

  return (
    <div className={className}>
      <Title text={title} size="xs" className="mb-3 font-bold" />

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50 pl-10"
            isShowIcons
            value={searchValue}
            onIconClearClick={() => setSearchValue("")}
          />
        </div>
      )}

      <ul className="scrollbar grid max-h-96 gap-4 overflow-auto pr-2">
        {list.map((item, index) => (
          <li key={`${index}-${item.value}-${item.text}`}>
            <FilterCheckbox
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selectedValues?.has(item.value)}
              onCheckedChange={() => onCheckboxClick?.(item.value)}
              name={name}
            />
          </li>
        ))}

        {searchValue.length > 0 && list.length === 0 && (
          <li>
            <div className="flex items-center justify-center py-5 text-sm text-gray-400">
              По вашему запросу ничего не найдено
            </div>
          </li>
        )}
      </ul>

      {items.length > limit && !searchValue.length && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="text-primary hover:text-primary/80 mt-5 transition-colors duration-100"
          type="button"
        >
          {!showAll ? "+ Показать ещё" : "Скрыть"}
        </button>
      )}
    </div>
  );
};
