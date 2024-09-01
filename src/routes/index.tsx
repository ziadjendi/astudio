import { Navigate, useRoutes } from "react-router-dom";
import Products from "../features/products";
import Users from "../features/users";
import UserContextProvider from "../contexts/UsersContext";
import ProductContextProvider from "../contexts/ProductsContext";

export const AppRoutes = () => {
  const routes = [
    {
      path: "users/*",
      element: (
        <UserContextProvider>
          <Users />
        </UserContextProvider>
      ),
    },
    {
      path: "products/*",
      element: (
        <ProductContextProvider>
          <Products />
        </ProductContextProvider>
      ),
    },
    {
      path: "/*",
      element: <Navigate to="users" replace />, // Redirect root to /users
    },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
