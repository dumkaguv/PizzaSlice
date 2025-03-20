import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { ProductWithItems } from "@/@types/prisma";

export const search = async (query: string): Promise<ProductWithItems[]> => {
  return (
    await axiosInstance.get<ProductWithItems[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;
};
