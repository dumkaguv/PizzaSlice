"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";
import { Description } from "@radix-ui/react-dialog";

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
          "!max-w-5xl overflow-auto bg-white p-0 max-h-[95dvh] h-[100%] max-lg:w-[95%]",
          className,
        )}
      >
        <DialogTitle className="hidden h-[0.1px] w-[0.1px]" />
        <ProductForm product={product} onSubmit={() => router.back()} />
        <Description className="hidden h-[0.1px] w-[0.1px]" />
      </DialogContent>
    </Dialog>
  );
};
