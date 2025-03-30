"use client";

import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import Image from "next/image";

import {
  AuthModal,
  CartButton,
  Container,
  ProfileButton,
  SearchInput,
} from "@/shared/components/shared";
import Link from "next/link";
import { useHeaderToasts } from "../hooks";

interface Props {
  hasSearch?: boolean;
  hasCartButton?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = false,
  hasCartButton = true,
  className,
}) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  useHeaderToasts();

  return (
    <header className={cn("border-b border-gray-200", className)}>
      <Container className="flex items-center justify-between py-8 max-xl:py-5 max-md:py-3">
        {/* Левая часть  */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt=""
              className="max-sm:h-[30px] max-sm:w-[30px]"
              width={35}
              height={35}
            />
            <div>
              <h1 className="text-xl font-black uppercase max-sm:text-[18px]">
                Pizza Slice
              </h1>
              <p className="text-sm leading-3 text-gray-400">
                Нереально вкусно!
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1 max-lg:mx-5">
            <SearchInput />
          </div>
        )}

        {/* Правая часть  */}
        <div className="flex items-center gap-2">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCartButton && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
