import React from "react";

import { Title } from "@/shared/components/shared";
import { Skeleton } from "@/shared/components/ui";

interface Props {
  title: string;
  limit?: number;
  className?: string;
}

export const SkeletonCheckboxFiltersGroup: React.FC<Props> = ({ title, limit = 5, className }) => {
  return (
    <div className={className}>
      <Title text={title} size="xs" className="mb-3 font-bold" />

      {new Array(limit).fill(null).map((_, index) => (
        <Skeleton key={index} className="mb-4 h-6 rounded-lg" />
      ))}
      <Skeleton className="mb-4 h-6 w-28 rounded-lg" />
    </div>
  );
};
