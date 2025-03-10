import React from "react";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma-client";
import { ChooseProductModal } from "@/shared/components/shared";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductModalPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      productId: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
