"use client";

import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import { Description } from "@radix-ui/react-dialog";
import { LoginForm, RegisterForm } from "./forms";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<"login" | "resister">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "resister" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle className="hidden" />
      <Description className="hidden" />
      <DialogContent className="w-[450px] bg-white p-10 max-sm:p-5 overflow-y-auto max-h-[95dvh]">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="h-12 flex-1 gap-2 p-2"
          >
            <Image
              className="h-6 w-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              width={20}
              height={20}
              alt=""
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="h-12 flex-1 gap-2 p-2"
          >
            <Image
              className="h-6 w-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt=""
              width={20}
              height={20}
            />
            Google
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type !== "login" ? "Войти" : "Регистрация"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
