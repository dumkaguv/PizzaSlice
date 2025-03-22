import { create } from "zustand";
import { Api } from "@/shared/services/api-client";
import { getCartDetails } from "@/shared/lib";
import { CartStateItem } from "../lib/cart/get-cart-details";

export interface CartState {
  isLoading: boolean;
  isError: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isError: false,
  isLoading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ isLoading: true, isError: false });

      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {},

  removeCartItem: async (id: number) => {},

  addCartItem: async (values: any) => {},
}));
