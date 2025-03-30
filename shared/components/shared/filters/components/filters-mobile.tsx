"use client";

import { Sheet } from "@/shared/components/ui";
import {
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Description } from "@radix-ui/react-dialog";
import React from "react";
import { Filters } from "./filters";
import { DialogTitle } from "@/shared/components/ui/dialog";

interface Props {
  trigger: React.ReactNode;
}

export const FiltersMobile: React.FC<Props> = ({ trigger }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <DialogTitle />
      <SheetContent side="left">
        <Description />
        <Filters showInDrawer={true} />
      </SheetContent>
    </Sheet>
  );
};
