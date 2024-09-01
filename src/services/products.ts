import API from "./API";

export const fetchProducts = async (
  pageSize: number,
  filterValue?: string | number,
  filterKey?: string
) => {
  const url =
    filterKey && filterValue
      ? `/products/${filterKey}/${filterValue.toString().replace(/ /g, "%20")}`
      : `/products`;
  const response = await API.get(url, {
    params: {
      limit: pageSize,
    },
  });
  return response.data;
};
