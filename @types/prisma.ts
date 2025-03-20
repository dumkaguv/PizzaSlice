import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};

export type ProductWithItems = Product & {
  items: ProductItem[];
};
