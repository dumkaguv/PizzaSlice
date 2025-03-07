"use client";

import React from "react";

import { Title } from "./";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "@/components/ui";

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
    return (
      <div className={className}>
        <Title text={title} size="xs" className="mb-3 font-bold" />

        {new Array(limit).fill(null).map((_, index) => (
          <Skeleton key={index} className="mb-4 h-6 rounded-lg" />
        ))}
        <Skeleton className="mb-4 h-6 w-28 rounded-lg" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : items.slice(0, limit);

  const onShowAllClick = () => {
    setShowAll((prev) => !prev);
  };

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onIconClearClick = () => {
    setSearchValue("");
  };

  return (
    <div className={className}>
      <Title text={title} size="xs" className="mb-3 font-bold" />

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onSearchInputChange}
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50 pl-10"
            isShowIcons
            value={searchValue}
            onIconClearClick={onIconClearClick}
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
      </ul>

      {items.length > limit && !searchValue.length && (
        <button
          onClick={onShowAllClick}
          className="text-primary hover:text-primary/80 mt-5 transition-colors duration-100"
          type="button"
        >
          {!showAll ? "+ Показать ещё" : "Скрыть"}
        </button>
      )}
    </div>
  );
};
