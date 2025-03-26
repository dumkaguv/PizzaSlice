import React from "react";

import { Title } from "@/shared/components/shared/title";
import { cn } from "@/shared/lib/utils";

interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  contentClassName?: string;
  className?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn("rounded-3xl bg-white", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-gray-100 p-5 px-7">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  );
};
