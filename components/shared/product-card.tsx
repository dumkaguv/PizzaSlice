import Link from "next/link";
import Image from "next/image";
import React from "react";

import { Title } from "./";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ ...props }) => {
  const { id, name, price, imageUrl, className } = props;

  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="bg-secondary flex h-[260px] justify-center rounded-lg p-6">
          <Image
            className="h-[215px] w-[215px]"
            width={215}
            height={215}
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title text={name} size="sm" className="mt-3 mb-1 font-bold" />

        <p className="text-sm text-gray-400">Ингридиенты</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
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
