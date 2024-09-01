import API from "./API";

export const fetchUsers = async (
  pageSize: number,
  filterValue?: string | number,
  filterKey?: string
) => {
  const url = filterKey && filterValue ? `/users/filter` : `/users`;
  const response = await API.get(url, {
    params: {
      limit: pageSize,
      value: filterValue,
      key: filterKey,
    },
  });
  return response.data;
};
