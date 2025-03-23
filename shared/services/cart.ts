import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);

  return data;
};

export const updateItemQuantity = async (
  id: number,
  quantity: number,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(
    ApiRoutes.CART + "/" + id,
    {
      quantity,
    },
  );

  return data;
};

export const deleteCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(
    ApiRoutes.CART + "/" + id,
  );

  return data;
};

export const addCartItem = async (
  values: CreateCartItemValues,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(ApiRoutes.CART, values);

  return data;
};
