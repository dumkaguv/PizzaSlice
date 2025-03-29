"use server";

import { hashSync } from "bcrypt";
import { prisma } from "@/prisma/prisma-client";
import { TCheckoutFormValues } from "./../shared/components/shared/checkout/schemas";
import { cookies } from "next/headers";
import { OrderStatus, Prisma } from "@prisma/client";
import { createPayment, sendEmail } from "@/shared/lib";
import {
  PayOrderTemplate,
  VerificationUserTemplate,
} from "@/shared/components/shared";
import { getUserSession } from "@/shared/lib/get-user-session";

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

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: {
        userId: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verifiedAt) {
        throw new Error("Email is not verified");
      }

      throw new Error("User already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        verifiedAt: new Date(),
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userRef: createdUser.userId,
      },
    });

    await sendEmail(
      createdUser.email,
      "Pizza Slice | Подтвердите регистрацию",
      VerificationUserTemplate({
        code,
      }) as React.ReactNode,
    );
  } catch (error) {
    console.log(error);
  }
}
