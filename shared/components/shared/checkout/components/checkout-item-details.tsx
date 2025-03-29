import React from "react";

interface Props {
  title?: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
}

export const CheckoutItemDetails: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="my-4 flex">
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200"></div>
      </span>

      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};
