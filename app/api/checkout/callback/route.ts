import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/shared/lib";
import { SuccessOrderTemplate } from "@/shared/components/shared";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        orderId: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Заказ не найден" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        orderId: order.orderId,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Pizza Slice ваш заказ оформлен!",
        SuccessOrderTemplate({
          orderId: order.orderId,
          items,
        }) as React.ReactNode,
      );
    }
  } catch (error) {
    console.log(error);
  }
}
