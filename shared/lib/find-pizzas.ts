import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredients = params.ingredients?.split(",").map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const sortBy = params.sortBy;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          productId: "desc",
        },
        where: {
          ingredients: ingredients
            ? {
                some: {
                  ingredientId: {
                    in: ingredients,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  console.log(categories);

  if (sortBy?.includes("price")) {
    categories.forEach((category) => {
      category.products.sort((a, b) => {
        const aPrice = a.items[0].price;
        const bPrice = b.items[0].price;

        return sortBy === "-price" ? bPrice - aPrice : aPrice - bPrice;
      });
    });
  }

  console.log(categories, "AFTER SORT");

  return categories;
};
