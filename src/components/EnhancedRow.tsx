import { Checkbox, TableCell, TableRow } from "@mui/material";

interface IEnhancedRowProps<T> {
  handleClick(id: number): void;
  data: T;
  isItemSelected: boolean;
  labelId: string;
}
function EnhancedRow<T extends { id: number }>({
  handleClick,
  data,
  isItemSelected,
  labelId,
}: IEnhancedRowProps<T>) {
  return (
    <TableRow
      hover
      onClick={() => handleClick(data.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={data.id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>

      {Object.values(data).map((key, index) =>
        index === 0 ? null : index === 1 ? (
          <TableCell component="th" id={labelId} scope="data" padding="none" key={data.id + "01"}>
            {key}
          </TableCell>
        ) : (
          <TableCell align="right" key={key + data.id}>
            {key}
          </TableCell>
        )
      )}
    </TableRow>
  );
}

export default EnhancedRow;
