import React, { createContext, useReducer, useEffect } from "react";
import { HeadCell } from "../components/EnhancedTableHead";
import { fetchProducts } from "../services/products";
import { IFilter } from "../utils/interfaces";

export interface IProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
}

const headCells: HeadCell<IProduct>[] = [
  { id: "title", numeric: false, disablePadding: true, label: "Title" },
  { id: "category", numeric: false, disablePadding: false, label: "Category" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "rating", numeric: true, disablePadding: false, label: "Rating" },
  { id: "brand", numeric: false, disablePadding: false, label: "Brand" },
  { id: "sku", numeric: false, disablePadding: false, label: "Sku" },
  { id: "warrantyInformation", numeric: false, disablePadding: false, label: "Warranty" },
  { id: "shippingInformation", numeric: false, disablePadding: false, label: "Shipping" },
  { id: "availabilityStatus", numeric: false, disablePadding: false, label: "Availability" },
  { id: "weight", numeric: true, disablePadding: false, label: "Weight" },
];

const filters: IFilter<IProduct>[] = [
  {
    label: "Category",
    key: "category",
    values: ["beauty", "fragrances", "furniture", "groceries"],
  },
  { label: "Brand", key: "brand", values: ["Essence", "Glamour Beauty", "Velvet Touch"] },
  { label: "Availability", key: "availabilityStatus", values: ["Low Stock", "In Stock"] },
];

// Define the initial state structure
interface IProductState {
  products: IProduct[]; // List of products
  isLoadingProducts: boolean; // Loading state for fetching products
  pageSize: number;
  filterValue?: string | number;
  filterKey?: keyof IProduct;
  headCells: typeof headCells;
  filters: IFilter<IProduct>[];
}

// Initial state
const initialState: IProductState = {
  products: [],
  isLoadingProducts: true,
  pageSize: 5,
  headCells,
  filters,
};

// Define the action types
type Action =
  | { type: "SET_LOADING_PRODUCTS"; payload: boolean }
  | { type: "SET_PRODUCTS"; payload: IProduct[] }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_FILTER_VALUE"; payload: string | number }
  | { type: "SET_FILTER_KEY"; payload: keyof IProduct };

// Reducer function
const reducer = (state: IProductState, action: Action): IProductState => {
  switch (action.type) {
    case "SET_LOADING_PRODUCTS":
      return { ...state, isLoadingProducts: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, isLoadingProducts: false };
    case "SET_FILTER_VALUE":
      return { ...state, filterValue: action.payload };
    case "SET_FILTER_KEY":
      return { ...state, filterKey: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
};

// Create Context
export const ProductContext = createContext<{
  state: IProductState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

// ProductContextProvider Component
const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filterKey, filterValue, pageSize } = state;

  const getProducts = async () => {
    dispatch({ type: "SET_LOADING_PRODUCTS", payload: true });

    try {
      const response = await fetchProducts(pageSize, filterValue, filterKey);

      const filteredProducts: IProduct[] = response.products.map((product: IProduct) => ({
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        rating: product.rating,
        brand: product.brand,
        sku: product.sku,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        weight: product.weight,
      }));
      dispatch({ type: "SET_PRODUCTS", payload: filteredProducts });
    } catch (error: unknown) {
      console.log(error);
    }

    dispatch({ type: "SET_LOADING_PRODUCTS", payload: false });
  };

  useEffect(() => {
    getProducts();
  }, [pageSize, filterValue]);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
