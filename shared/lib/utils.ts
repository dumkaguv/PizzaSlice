import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getCorrectEnding(number: number, word: string) {
  const cases = [2, 0, 1, 1, 1, 2];

  const getCase = (n: number) => {
    if (n % 100 > 10 && n % 100 < 20) {
      return 2;
    }
    return cases[Math.min(n % 10, 5)];
  };

  const endings: { [key: string]: string[] } = {
    товар: ["товар", "товара", "товаров"],
  };

  const words = endings[word];
  if (words) {
    return words[getCase(number)];
  }
  return word;
}
