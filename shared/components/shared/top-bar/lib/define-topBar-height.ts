export const defineTopBarHeight = () => {
  const topBarSelector = "[data-js-top-bar]";
  const topBarElement = document.querySelector(topBarSelector) as HTMLElement;

  if (topBarElement) {
    const topBarHeight = topBarElement.offsetHeight;
    document.documentElement.style.setProperty(
      "--top-bar-height",
      `${topBarHeight}px`,
    );
  }
};
