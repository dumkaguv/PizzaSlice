import React from "react";

/**
 * Custom hook to manage the state and behavior of a text input for search functionality.
 *
 * @param inputDivRef - A ref object attached to the input's container div to handle outside clicks.
 * @returns An object containing:
 *   - `searchQuery`: The current search query string.
 *   - `setSearchQuery`: A function to update the search query.
 *   - `isFocused`: A boolean indicating if the input is focused.
 *   - `setIsFocused`: A function to update the focus state.
 *   - `onInputChange`: A function to handle input changes and update the search query.
 *   - `onInputFocus`: A function to toggle the focus state when the input gains focus.
 *   - `onOutsideClick`: A function to handle clicks outside the input and blur the input if needed.
 *   - `onIconClearClick`: A function to clear the search query, triggered by a clear icon click or key press.
 */

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
