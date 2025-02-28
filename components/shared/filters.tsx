import React from "react";

import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from "./";
import { Input } from "@/components/ui";

interface Props {
  className?: string;
}

const ingredients = [
  {
    text: "Сырный соус",
    value: "3",
  },
  {
    text: "Моццарелла",
    value: "4",
  },
  {
    text: "Чеснок",
    value: "5",
  },
  {
    text: "Солёные огурчики",
    value: "6",
  },
  {
    text: "Томаты",
    value: "7",
  },
  {
    text: "Томаты",
    value: "8",
  },
  {
    text: "Томаты",
    value: "9",
  },
  {
    text: "Томаты",
    value: "10",
  },
];

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до:</p>
        <div className="mb-5 flex gap-3">
          <Input type="number" placeholder="0" min={0} defaultValue={0} />
          <Input type="number" placeholder="1000" min={0} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <div className="mt-5 py-6 pb-7">
        <CheckboxFiltersGroup limit={5} title="Ингредиенты:" items={ingredients} />
      </div>
    </div>
  );
};
