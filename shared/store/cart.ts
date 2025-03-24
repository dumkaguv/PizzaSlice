import { create } from "zustand";
import { Api } from "@/shared/services/api-client";
import { getCartDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/cart/get-cart-details";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export interface CartState {
  isLoading: boolean;
  isError: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
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

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        isLoading: true,
        isError: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item,
        ),
      }));

      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ isError: true });
    } finally {
      set((state) => ({
        isLoading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        isLoading: true,
        isError: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item,
        ),
      }));

      const data = await Api.cart.deleteCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ isError: true });
    } finally {
      set((state) => ({
        isLoading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ isLoading: true, isError: false });

      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
