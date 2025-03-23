import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/cart/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/cart/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as CreateCartItemValues;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartRef: userCart.cartId,
        productItemRef: data.productItemId,
        ingredients: {
          every: {
            ingredientId: {
              in: data.ingredientsIds,
            },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          cartItemId: findCartItem.cartItemId,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    }

    await prisma.cartItem.create({
      data: {
        cartRef: userCart.cartId,
        productItemRef: data.productItemId,
        quantity: 1,
        ingredients: {
          connect: data.ingredientsIds?.map((id) => ({
            ingredientId: id,
          })),
        },
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);

    response.cookies.set("cartToken", token);

    return response;
  } catch (e) {
    console.log("[CART_POST] Server error", e);
    return NextResponse.json(
      { message: "Не удалось создать корзину." },
      { status: 500 },
    );
  }
}
