import React from "react";
import { notFound } from "next/navigation";

import { Container, ProductGroupVariants, PizzaImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: {
      productId: Number(id),
    },
  });

  if (!product) {
    return notFound()
  }

  return (
      <Container className="flex flex-col my-10">
        <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} width={400} height={400} size={40} />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">Details...</p>
          <ProductGroupVariants items={[]} />
        </div>
        </div>
      </Container>
  );
}
