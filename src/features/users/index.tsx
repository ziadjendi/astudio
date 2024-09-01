import { useContext, useState } from "react";
import EnhancedTable from "../../components/EnhancedTable";
import { IUser, UserContext } from "../../contexts/UsersContext";
import { Box, Paper } from "@mui/material";
import EnhancedTableToolbar from "../../components/EnhancedTableToolbar";
import Loader from "../../components/Loader";

const Users = () => {
  const { state, dispatch } = useContext(UserContext);
  const [filterText, setFilterText] = useState("");

  const selectFilterChangeHandler = (key: keyof IUser, value: string | number) => {
    dispatch({ type: "SET_FILTER_KEY", payload: key });
    dispatch({ type: "SET_FILTER_VALUE", payload: value });
  };
  const pageSizeChangeHandler = (value: number) => {
    dispatch({ type: "SET_PAGE_SIZE", payload: value });
  };
  if (state.isLoadingUsers)
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
        <EnhancedTableToolbar<IUser>
          numSelected={0}
          filterText={filterText}
          filters={state.filters}
          filterKey={state.filterKey}
          filterValue={state.filterValue}
          onPageSizeChange={pageSizeChangeHandler}
          pageSize={state.pageSize}
          searchBy={"First Name"}
          onFilterTextChange={(value: string) => setFilterText(value)}
          onSelectFilterChange={selectFilterChangeHandler}
          subject="Users"
        />
        <EnhancedTable<IUser>
          data={state.users}
          headers={state.headCells}
          filterText={filterText}
        />
      </Paper>
    </Box>
  );
};

export default Users;
