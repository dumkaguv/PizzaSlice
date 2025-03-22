import React from "react";

import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared/title";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemDetailsInfo: React.FC<Props> = ({
  name,
  details,
  className,
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <Title text={name} size="xs" className="font-bold" />
      {details && (
        <p className="text-sm text-[#a1a1a1]">{details}</p>
      )}
    </div>
  );
};
