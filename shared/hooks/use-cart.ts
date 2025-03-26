import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "@/shared/store/cart";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/cart/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  isLoading: boolean;
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(useShallow((state) => state));

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
