import React from "react";

import { CheckoutItemDetails, WhiteBlock } from "@/shared/components/shared";
import { ArrowRight, Package, Truck } from "lucide-react";
import { Button, Skeleton } from "@/shared/components/ui";
import { cn } from "@/shared/lib";

const DELIVERY_PRICE = 100;

interface Props {
  totalAmount: number;
  isLoading: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  isLoading,
  className,
}) => {
  return (
    <WhiteBlock className={cn("sticky top-4 p-6", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого</span>
        {isLoading ? (
          <Skeleton className="h-10 w-36" />
        ) : (
          <span className="text-4xl font-extrabold">
            {totalAmount > 0 ? totalAmount + DELIVERY_PRICE : 0} L
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость корзины
          </div>
        }
        value={
          isLoading ? <Skeleton className="h-6 w-14" /> : `${totalAmount} L`
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка
          </div>
        }
        value={
          isLoading ? <Skeleton className="h-6 w-12" /> : `${DELIVERY_PRICE} L`
        }
      />

      <div className="text-red-500">
        Внимание! Это тестовая оплата и деньги не будут списаны, можно
        использовать карту{" "}
        <span className="font-extrabold text-red-600">5555 5555 5555 4444</span>{" "}
        для проверки. Для остальных полей (CVV, месяц, год) можно заполнять, что
        угодно.
      </div>
      <Button
        type="submit"
        isLoading={isLoading}
        className={cn(
          "mt-6 h-14 w-full rounded-2xl text-base font-bold",
          totalAmount === 0 && "pointer-events-none opacity-40",
        )}
      >
        Перейти к оплате
        <ArrowRight size={20} className="ml-2" />
      </Button>
    </WhiteBlock>
  );
};
