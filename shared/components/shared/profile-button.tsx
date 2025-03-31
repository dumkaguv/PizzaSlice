"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { useWindowSize } from "react-use";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession();
  const width = useWindowSize().width;

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1 max-md:px-2.5"
        >
          <User size={16} />
          {width > 500 && "Войти"}
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2 max-md:px-2.5">
            <CircleUser size={18} />
            {width > 500 && "Профиль"}
          </Button>
        </Link>
      )}
    </div>
  );
};
