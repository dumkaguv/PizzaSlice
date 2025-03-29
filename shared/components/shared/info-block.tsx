import React from "react";
import Image from "next/image";

import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  text: string;
  imageUrl: string;
  className?: string;
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex w-[840px] items-center justify-between gap-12",
      )}
    >
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-lg text-gray-400">{text}</p>
        </div>

        <div className="mt-11 flex gap-5">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button
              variant="outline"
              className="border-gray-400 text-gray-500 hover:bg-gray-50"
            >
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <Image src={imageUrl} alt={title} width={300} height={300} />
    </div>
  );
};
