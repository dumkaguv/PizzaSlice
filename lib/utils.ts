import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const defineTopBarHeight = () => {
  const topBarSelector = "[data-js-top-bar]";
  const topBarElement = document.querySelector(topBarSelector) as HTMLElement;

  if (topBarElement) {
    const topBarHeight = topBarElement.offsetHeight;
    document.documentElement.style.setProperty('--top-bar-height', `${topBarHeight}px`);
  }
};

