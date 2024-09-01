import { useContext, useState } from "react";
import EnhancedTable from "../../components/EnhancedTable";
import { IProduct, ProductContext } from "../../contexts/ProductsContext";
import { Box, Paper } from "@mui/material";
import EnhancedTableToolbar from "../../components/EnhancedTableToolbar";
import Loader from "../../components/Loader";

const Products = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [filterText, setFilterText] = useState("");

  const selectFilterChangeHandler = (key: keyof IProduct, value: string | number) => {
    dispatch({ type: "SET_FILTER_KEY", payload: key });
    dispatch({ type: "SET_FILTER_VALUE", payload: value });
  };
  const pageSizeChangeHandler = (value: number) => {
    dispatch({ type: "SET_PAGE_SIZE", payload: value });
  };
  if (state.isLoadingProducts)
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar<IProduct>
          numSelected={0}
          filterText={filterText}
          filters={state.filters}
          filterKey={state.filterKey}
          filterValue={state.filterValue}
          onPageSizeChange={pageSizeChangeHandler}
          pageSize={state.pageSize}
          searchBy={"Title"}
          onFilterTextChange={(value: string) => setFilterText(value)}
          onSelectFilterChange={selectFilterChangeHandler}
          subject="Products"
        />
        <EnhancedTable<IProduct>
          data={state.products}
          headers={state.headCells}
          filterText={filterText}
        />
      </Paper>
    </Box>
  );
};

export default Products;
