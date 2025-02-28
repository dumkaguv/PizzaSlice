"use client";

import React from "react";

import { Title } from "./";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "@/components/ui";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValues?: string[];
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({ ...props }) => {
  const {
    title,
    items,
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    onChange,
    defaultValues,
    className,
  } = props;

  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : items.slice(0, limit);

  const onShowAllClick = () => {
    setShowAll((prev) => !prev);
  };

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={className}>
      <Title text={title} size="xs" className="mb-3 font-bold" />

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(event) => onSearchInputChange(event.target.value)}
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50"
            value={searchValue}
          />
        </div>
      )}

      <ul className="scrollbar grid max-h-96 gap-4 overflow-auto pr-2">
        {list.map((item, index) => (
          <li key={index}>
            <FilterCheckbox
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
            />
          </li>
        ))}
      </ul>

      {items.length > limit && !searchValue.length && (
        <button
          onClick={onShowAllClick}
          className="text-primary mt-5"
          type="button"
        >
          {!showAll ? "+ Показать ещё" : "Скрыть"}
        </button>
      )}
    </div>
  );
};
