"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import {
  checkoutFormSchema,
  TCheckoutFormValues,
} from "@/shared/components/shared/checkout/schemas";

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, isLoading } =
    useCart();

  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log(data);
  };

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

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="mb-20 flex flex-1 flex-col gap-10">
              <CheckoutCart
                items={items}
                onCountButtonClick={onCountButtonClick}
                removeCartItem={removeCartItem}
              />

              <CheckoutPersonalForm />

              <CheckoutAddressForm />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
