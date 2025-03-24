import { Title } from "@/shared/components/shared/title";
import { Button } from "@/shared/components/ui";
import Image from "next/image";
import React from "react";
import { MoveLeft } from "lucide-react";
import { cn } from "@/shared/lib";
import { DrawerClose } from "@/shared/components/ui/drawer";

interface Props {
  className?: string;
}

export const EmptyCart: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "my-auto flex flex-1 flex-col items-center justify-center",
        className,
      )}
    >
      <Image
        src="/assets/images/empty-box.png"
        className="mb-5"
        width={120}
        height={120}
        alt=""
      />

      <Title text="Корзина пустая" size="sm" className="mb-1.5 font-bold" />
      <p className="mb-10 w-[285px] text-center opacity-40">
        Добавьте хотя бы одну пиццу, чтобы совершить заказ
      </p>
      <DrawerClose asChild>
        <Button size={"xl"} className="rounded-2xl text-base font-bold">
          <MoveLeft size={24} className="mr-2.5" />
          Вернуться назад
        </Button>
      </DrawerClose>
    </div>
  );
};
