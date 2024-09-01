export type Order = "asc" | "desc";
export interface IFilter<T> {
  label: string;
  key: keyof T;
  values: (string | number)[];
}
