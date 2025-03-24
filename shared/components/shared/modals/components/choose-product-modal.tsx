"use client";

import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-5xl !max-w-5xl overflow-hidden bg-white p-0",
          className,
        )}
      >
        <DialogTitle className="h-[0.1px] w-[0.1px]" />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
