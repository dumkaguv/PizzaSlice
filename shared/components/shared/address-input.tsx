"use client";

import React, { useId } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const id = useId();

  return (
    <AddressSuggestions
      token="223827c84279c64292f04d734fdac0e55457400e"
      onChange={(data) => onChange?.(data?.value)}
      delay={200}
      filterLocations={[{ country: "*" }]}
      uid={id}
    />
  );
};
