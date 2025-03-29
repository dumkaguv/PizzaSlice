"use server";

import { prisma } from "@/prisma/prisma-client";
import { TCheckoutFormValues } from "./../shared/components/shared/checkout/schemas";
import { cookies } from "next/headers";
import { OrderStatus } from "@prisma/client";
import { createPayment, sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared";

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;

    if (!cartToken) {
      return;
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      return;
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        tokenRef: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        cartId: userCart.cartId,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartRef: userCart.cartId,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      description: "Pizza Slice | оплата заказа #" + order.orderId,
      orderId: order.orderId,
    });

    if (!paymentData) {
      throw new Error("Payment error");
    }

    await prisma.order.update({
      where: {
        orderId: order.orderId,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      "Pizza Slice | оплатите заказ #" + order.orderId,
      PayOrderTemplate({
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        paymentUrl,
      }) as React.ReactNode,
    );

    return paymentUrl;
  } catch (err) {
    console.log(err);
  }
}
