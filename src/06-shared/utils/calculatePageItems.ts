export const calculatePageItems = (
  page: number,
  dataCount: number,
  currentDataLength: number,
) => {
  const itemsPerPage = 10;
  const TotalPages = Math.ceil((dataCount ?? 0) / itemsPerPage);

  const fromItemsIndex =
    currentDataLength > 0 ? (page - 1) * itemsPerPage + 1 : 0;

  const toItemsIndex =
    fromItemsIndex > 0 ? fromItemsIndex + currentDataLength - 1 : 0;

  return { fromItemsIndex, toItemsIndex, TotalPages };
};
