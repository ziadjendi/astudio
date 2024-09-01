import { alpha, Toolbar, Typography } from "@mui/material";
import Filters from "./Filters";
import NavBar from "./NavBar";
import { IFilter } from "../utils/interfaces";

interface EnhancedTableToolbarProps<T> {
  numSelected: number;
  filterText: string;
  filters: IFilter<T>[];
  filterKey?: keyof T;
  filterValue?: string | number;
  searchBy: string;
  subject: string;
  pageSize: number;
  onPageSizeChange(value: number): void;
  onFilterTextChange: (value: string) => void;
  onSelectFilterChange: (key: keyof T, value: string | number) => void;
}

function EnhancedTableToolbar<T>({
  numSelected,
  filterText,
  filters,
  filterKey,
  filterValue,
  searchBy,
  subject,
  pageSize,
  onPageSizeChange,
  onFilterTextChange,
  onSelectFilterChange,
}: EnhancedTableToolbarProps<T>) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            padding: "16px",
            border: "2px #c0e3e5 solid",
            fontSize: "20px",
            backgroundColor: "#fdc936",
            color: "#322625",
            fontWeight: "bold",
            borderRadius: "50%",
            textAlign: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          component="span"
        >
          {subject}
        </Typography>
      )}

      {numSelected === 0 && (
        <Typography
          component="div"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <NavBar />
          <Filters<T>
            filterText={filterText}
            onFilterTextChange={onFilterTextChange}
            placeholder={`Search by ${searchBy}...`}
            onSelectFilterChange={onSelectFilterChange}
            filters={filters}
            filterKey={filterKey}
            filterValue={filterValue}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
          />
        </Typography>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
