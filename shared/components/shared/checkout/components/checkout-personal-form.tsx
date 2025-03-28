import React from "react";

import { FormInput, WhiteBlock } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={className} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" className="text-base" placeholder="Имя" />
        <Input name="lastName" className="text-base" placeholder="Фамилия" />
        <Input name="email" className="text-base" placeholder="E-mail" />
        <Input name="phone" className="text-base" placeholder="Телефон" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
