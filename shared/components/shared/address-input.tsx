"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="223827c84279c64292f04d734fdac0e55457400e"
      onChange={(data) => onChange?.(data?.value)}
      delay={200}
      filterLocations={[{ country: "*" }]}
    />
  );
};
