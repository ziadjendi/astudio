import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Order } from "../utils/interfaces";
import { getComparator } from "../utils/helpers";
import EnhancedTableHead, { HeadCell } from "./EnhancedTableHead";
import EnhancedRow from "./EnhancedRow";

interface IEnhancedTableProps<T> {
  data: T[];
  headers: HeadCell<T>[];
  filterText: string;
}
export default function EnhancedTable<T extends { id: number }>({
  data,
  headers,
  filterText,
}: IEnhancedTableProps<T>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T>();
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState<T[]>([]);
  const [emptyRows, setEmptyRows] = useState<number>(0);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredRows(data);
      setEmptyRows(rowsPerPage);
    } else {
      const filterKey = Object.keys(data[0])[1] as keyof T;
      const updateFilteredRows = data.filter(row =>
        (row[filterKey] as string).toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredRows(updateFilteredRows);
      const updateEmptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;
      setEmptyRows(updateEmptyRows);
    }
  }, [data, filterText]);

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy as string))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.id);
      setSelected(newSelected as number[]);
      return;
    }
    setSelected([]);
  };
  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy as string}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={filteredRows.length}
          headCells={headers}
        />
        <TableBody>
          {visibleRows.map((row, index) => (
            <EnhancedRow
              key={index}
              handleClick={handleClick}
              data={row}
              isItemSelected={isSelected(row.id)}
              labelId={`enhanced-table-checkbox-${index}`}
            />
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: (dense ? 33 : 53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </TableContainer>
  );
}
