export const mapPizzaSize = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const;

export const mapPizzaType = {
  1: "традиционное",
  2: "тонкое",
} as const;

export const PIZZA_TYPES = Object.entries(mapPizzaType).map(
  ([value, text]) => ({
    text: text.charAt(0).toUpperCase() + text.slice(1),
    value,
  }),
);

export const PIZZA_SIZES = Object.entries(mapPizzaSize).map(([value]) => ({
  text: `${value} см`,
  value,
}));

export const PIZZA_SIZES_TEXT = Object.entries(mapPizzaSize).map(([key, value]) => ({
  text: value,
  value: key,
}));

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
