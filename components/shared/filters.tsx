"use client";

import React from "react";

import { Title, RangeSlider, CheckboxFiltersGroup } from "./";
import { Input } from "@/components/ui";
import { useFilters, useIngredients, useQueryFilters } from "@/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, formattedIngredients, isLoading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста:"
        name="pizzaTypes"
        className="mb-5"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        selectedValues={filters.pizzaTypes}
        onCheckboxClick={filters.setPizzaTypes}
      />

      <CheckboxFiltersGroup
        title="Размеры:"
        name="sizes"
        className="mb-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        selectedValues={filters.sizes}
        onCheckboxClick={filters.setSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до:</p>

        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={filters.prices.priceFrom}
            onChange={(e) => filters.setPrices("priceFrom", e.target.value)}
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={filters.prices.priceTo}
            onChange={(e) => filters.setPrices("priceTo", e.target.value)}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={(prices: number[]) => {
            filters.setPrices("priceFrom", prices[0]);
            filters.setPrices("priceTo", prices[1]);
          }}
        />
      </div>

      <div className="mt-5 py-6 pb-7">
        <CheckboxFiltersGroup
          key={ingredients[0].ingredientId}
          limit={5}
          name="ingredients"
          title="Ингредиенты:"
          items={formattedIngredients}
          isLoading={isLoading}
          onCheckboxClick={filters.setSelectedIngredients}
          selectedValues={filters.selectedIngredients}
        />
      </div>
    </div>
  );
};
