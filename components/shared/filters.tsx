"use client";

import React, { useState } from "react";
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from "./";
import { Input } from "@/components/ui";
import { UseFilterIngredients } from "@/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading } = UseFilterIngredients();
  const formattedIngredients = ingredients.map((ingredient) => ({
    value: ingredient.ingredientId.toString(),
    text: ingredient.name,
  }));

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handleSliderChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleInputChange = (index: number, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value, 10);
    const newRange: [number, number] = [...priceRange];

    newRange[index] = Math.max(0, Math.min(numValue, 1000));
    setPriceRange(newRange);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до:</p>

        {/* Инпуты для ввода цены */}
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={priceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>

        {/* Слайдер, синхронизированный с инпутами */}
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handleSliderChange}
        />
      </div>

      <div className="mt-5 py-6 pb-7">
        <CheckboxFiltersGroup
          limit={5}
          title="Ингредиенты:"
          items={formattedIngredients}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
