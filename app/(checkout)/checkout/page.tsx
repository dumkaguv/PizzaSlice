"use client";

import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { getCartItemDetails } from "@/shared/components/shared/cart/lib";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, isLoading } =
    useCart();

  const onCountButtonClick = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        size="xl"
        className="mb-8 !text-[36px] font-extrabold"
      />

      <div className="flex gap-10">
        <div className="mb-20 flex flex-1 flex-col gap-10">
          <WhiteBlock title="1. Корзина" contentClassName="flex flex-col gap-5">
            {items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                )}
                disabled={item.disabled}
                onCountButtonClick={(type) =>
                  onCountButtonClick(item.id, item.quantity, type)
                }
                onRemoveItemClick={() => removeCartItem(item.id)}
              />
            ))}
          </WhiteBlock>

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарий к заказу"
              />
            </div>
          </WhiteBlock>
        </div>

        <div className="w-[450px]">
          <CheckoutSidebar
            totalAmount={totalAmount}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Container>
  );
}
