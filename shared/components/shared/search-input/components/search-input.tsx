"use client";

import React from "react";
import { Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui";
import { useInputSearch, useInputSearchState } from "../hooks";
import { SearchInputItem } from "./search-input-item";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const inputDivRef = React.useRef(null);

  const {
    searchQuery,
    setSearchQuery,
    isFocused,
    setIsFocused,
    onInputChange,
    onInputFocus,
    onOutsideClick,
    onIconClearClick,
  } = useInputSearch(inputDivRef);

  const { products, isLoading } = useInputSearchState(searchQuery);

  const onLinkClick = () => {
    setSearchQuery("");
    setIsFocused(false);
  };

  return (
    <>
      {isFocused && (
        <div
          onClick={onOutsideClick}
          className="fixed inset-0 z-30 bg-black/50"
        />
      )}

      <div
        ref={inputDivRef}
        className={cn(
          "relative z-30 flex h-11 flex-1 justify-between rounded-2xl",
          className,
        )}
      >
        <Input
          className="h-full w-full rounded-2xl bg-gray-100 pl-11 transition-colors duration-200 outline-none"
          type="text"
          placeholder="Найти пиццу..."
          isShowIcons
          value={searchQuery}
          onFocus={onInputFocus}
          onChange={onInputChange}
          onIconClearClick={onIconClearClick}
        />
        <div
          className={cn(
            "invisible absolute top-14 z-30 grid w-full gap-1.5 rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200",
            isFocused && "visible top-12 opacity-100",
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 p-4">
              <Search size={16} className="pointer-events-none text-gray-400" />{" "}
              <span>Ищем подходящие продукты по вашему запросу...</span>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <SearchInputItem
                key={product.productId}
                product={product}
                onLinkClick={onLinkClick}
                searchQuery={searchQuery}
              />
            ))
          ) : searchQuery ? (
            <div className="p-5 text-center">
              К сожалению, по вашему запросу &lsquo;{searchQuery}&lsquo; ничего
              не найдено 😔. Попробуйте изменить запрос.
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
