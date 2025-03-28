import React from "react";
import { cn } from "@/shared/lib";

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return <p className={cn("text-md text-red-500", className)}>{text}</p>;
};
