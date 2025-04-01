import Link from "next/link";
import Image from "next/image";
import React from "react";

import { Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Ingredient } from "@prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients?: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ ...props }) => {
  const { id, name, price, imageUrl, ingredients, className } = props;

  return (
    <div
      className={cn(
        "h-full transition-transform duration-200 hover:scale-[1.03]",
        className,
      )}
    >
      <Link className="grid min-h-full" href={`/product/${id}`}>
        <div className="bg-secondary flex h-[260px] justify-center rounded-lg p-6">
          <Image
            className="shrink-0 h-[215px] w-[215px]"
            width={215}
            height={215}
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title text={name} size="sm" className="mt-3 mb-1 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients?.map((ingredient) => ingredient.name).join(", ")}
        </p>

        <div className="mt-4 flex justify-between self-end">
          <span className="text-[20px]">
            от <b>{price} L</b>
          </span>

          <Button variant="secondary" className="font-black">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
