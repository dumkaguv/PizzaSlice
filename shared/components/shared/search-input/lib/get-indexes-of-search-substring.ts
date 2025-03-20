export const getIndexesOfSearchSubstring = (
  productName: string,
  searchQuery: string,
) => {
  const firstIndex = productName.indexOf(searchQuery);
  const lastIndex =
    firstIndex !== -1 ? firstIndex + searchQuery.length - 1 : -1;

  return {
    start: firstIndex,
    end: lastIndex,
  };
};
