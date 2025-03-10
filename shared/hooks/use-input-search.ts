import React from "react";

export const useInputSearch = (inputDivRef: React.RefObject<null>) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onInputFocus = () => {
    setIsFocused((prev) => !prev);
  };

  const onOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== inputDivRef.current) {
      setIsFocused(false);
    }
  };

  const onIconClearClick = (
    event: React.MouseEvent<SVGSVGElement> | React.KeyboardEvent<SVGSVGElement>,
  ) => {
    setSearchQuery("");

    if ("key" in event && event.key === "Enter") {
      setSearchQuery("");
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    isFocused,
    setIsFocused,
    onInputChange,
    onInputFocus,
    onOutsideClick,
    onIconClearClick,
  };
};
