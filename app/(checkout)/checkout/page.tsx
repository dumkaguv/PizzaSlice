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
import { cn } from "@/shared/lib";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  const onSubmit: SubmitHandler<TCheckoutFormValues> = async (data) => {
    try {
      const url = await createOrder(data);

      toast.success("Заказ успешно создан! Переход на оплату...", {
        icon: "🎉",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      toast.error("Не удалось создать заказ. Попробуйте еще раз.", {
        icon: "🚫",
      });
      console.error(error);
    }
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
      <Link href="/">
        <Button className="mb-5" type="button">
          <ArrowLeft size={18} className="mr-2" />
          Вернуться на главную
        </Button>
      </Link>
      <Title
        text="Оформление заказа"
        size="xl"
        className="mb-8 !text-[36px] font-extrabold"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10 max-xl:flex-col max-xl:gap-3">
            <div className="mb-20 flex flex-1 flex-col gap-10 max-xl:mb-10 max-md:gap-5">
              <CheckoutCart
                items={items}
                onCountButtonClick={onCountButtonClick}
                removeCartItem={removeCartItem}
                isLoading={isLoading}
              />

              <CheckoutPersonalForm
                className={cn({
                  "pointer-events-none opacity-40":
                    isLoading || items.length === 0,
                })}
              />

              <CheckoutAddressForm
                className={cn({
                  "pointer-events-none opacity-40":
                    isLoading || items.length === 0,
                })}
              />
            </div>

            <div className="xl:w-[450px]">
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
