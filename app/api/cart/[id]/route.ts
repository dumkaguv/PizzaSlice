import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/cart/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Не найден токен корзины." });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartItemId: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Не найден такой товар." });
    }

    await prisma.cartItem.update({
      where: {
        cartItemId: Number(id),
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (e) {
    console.log("[CART_PATCH] Server error", e);

    return NextResponse.json(
      { message: "Не удалось обновить корзину. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Не найден токен корзины." });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartItemId: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Не найден такой товар." });
    }

    await prisma.cartItem.delete({
      where: {
        cartItemId: Number(id),
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (e) {
    console.log("[CART_DELETE] Server error", e);

    return NextResponse.json(
      { message: "Не удалось удалить товар с корзины. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}
