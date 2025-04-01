import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const SuccessOrderTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку! </h1>
    <p>Ваш заказ №{orderId} оплачен. Список товаров:</p>
    <ul>
      {items.map((item) => (
        <li key={item.cartItemId}>
          <p>
            {item.productItem.product.name} - {item.productItem.price} L x{" "}
            {item.quantity} шт. = {item.productItem.price * item.quantity} L
          </p>
        </li>
      ))}
    </ul>
  </div>
);
