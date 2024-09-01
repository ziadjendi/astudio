import React, { createContext, useReducer, useEffect } from "react";
import { fetchUsers } from "../services/users";
import { HeadCell } from "../components/EnhancedTableHead";
import { IFilter } from "../utils/interfaces";

export interface IUser {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  bloodGroup: string;
  eyeColor: string;
  height: number;
  weight: number;
}

const headCells: HeadCell<IUser>[] = [
  { id: "firstName", numeric: false, disablePadding: true, label: "First Name" },
  { id: "maidenName", numeric: false, disablePadding: false, label: "Maiden Name" },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "age", numeric: true, disablePadding: false, label: "Age" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
  { id: "username", numeric: false, disablePadding: false, label: "Username" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  { id: "bloodGroup", numeric: false, disablePadding: false, label: "Blood Group" },
  { id: "eyeColor", numeric: false, disablePadding: false, label: "Eye Color" },
  { id: "height", numeric: true, disablePadding: false, label: "Height" },
  { id: "weight", numeric: true, disablePadding: false, label: "Weight" },
];

const filters: IFilter<IUser>[] = [
  {
    label: "Blood Group",
    key: "bloodGroup",
    values: ["A-", "A+", "B-", "B+", "O-", "O+", "AB-", "AB+"],
  },
  { label: "Gender", key: "gender", values: ["male", "female"] },
  { label: "Eye Color", key: "eyeColor", values: ["Blue", "Brown", "Green"] },
];

// Define the initial state structure
interface IUserState {
  users: IUser[]; // List of users
  isLoadingUsers: boolean; // Loading state for fetching users
  pageSize: number;
  filterValue?: string | number;
  filterKey?: keyof IUser;
  headCells: typeof headCells;
  filters: IFilter<IUser>[];
}

// Initial state
const initialState: IUserState = {
  users: [],
  isLoadingUsers: true,
  pageSize: 5,
  headCells,
  filters,
};

// Define the action types
type Action =
  | { type: "SET_LOADING_USERS"; payload: boolean }
  | { type: "SET_USERS"; payload: IUser[] }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_FILTER_VALUE"; payload: string | number }
  | { type: "SET_FILTER_KEY"; payload: keyof IUser };

// Reducer function
const reducer = (state: IUserState, action: Action): IUserState => {
  switch (action.type) {
    case "SET_LOADING_USERS":
      return { ...state, isLoadingUsers: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload, isLoadingUsers: false };
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
export const UserContext = createContext<{
  state: IUserState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

// UserContextProvider Component
const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filterKey, filterValue, pageSize } = state;

  const getUsers = async () => {
    dispatch({ type: "SET_LOADING_USERS", payload: true });

    try {
      const response = await fetchUsers(pageSize, filterValue, filterKey);

      const filteredUsers: IUser[] = response.users.map((user: IUser) => ({
        id: user.id,
        firstName: user.firstName,
        maidenName: user.maidenName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        username: user.username,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        eyeColor: user.eyeColor,
        height: user.height,
        weight: user.weight,
      }));
      dispatch({ type: "SET_USERS", payload: filteredUsers });
    } catch (error: unknown) {
      console.log(error);
    }

    dispatch({ type: "SET_LOADING_USERS", payload: false });
  };

  useEffect(() => {
    getUsers();
  }, [pageSize, filterValue]);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
