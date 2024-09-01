import { ChangeEvent, useEffect, useState } from "react";
import {
  InputBase,
  IconButton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IFilter } from "../utils/interfaces";

interface IFilterProps<T> {
  filters: IFilter<T>[];
  filterKey?: keyof T;
  filterValue?: string | number;
  filterText?: string;
  pageSize: number;
  onPageSizeChange(value: number): void;
  onFilterTextChange: (value: string) => void;
  onSelectFilterChange: (key: keyof T, value: string | number) => void;
  placeholder?: string;
}

function Filters<T>({
  filterText,
  filters,
  filterKey,
  filterValue,
  pageSize,
  onPageSizeChange,
  onFilterTextChange,
  onSelectFilterChange,
  placeholder = "Filter...",
}: IFilterProps<T>) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSelectChange = (key: keyof T, value: string | number) => {
    onSelectFilterChange(key, value);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const filterTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onFilterTextChange(event.target.value);
  };

  useEffect(() => {
    if (!isSearchVisible) onFilterTextChange("");
  }, [isSearchVisible]);

  return (
    <Box
      sx={{
        padding: "12px 20px",
        backgroundColor: "#322625",
        borderRadius: 4,
        border: "2px #c0e3e5 solid",
      }}
    >
      <Typography
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Typography component="span" sx={{ textWrap: "nowrap", color: "#c0e3e5" }}>
          Page Size
        </Typography>
        <Select
          value={pageSize}
          onChange={event => onPageSizeChange(parseInt(event.target.value as string))}
          displayEmpty
          sx={{
            color: "#322625", // Black text color
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c0e3e5", // Blue border color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fdc936", // Yellow border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fdc936", // Yellow border color on focus
            },
          }}
        >
          {[5, 10, 20, 50].map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Typography
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#c0e3e5", // Blue background
            borderRadius: isSearchVisible ? "10px" : "50%",
            padding: "2px 8px",
            width: isSearchVisible ? "270px" : "40px", // Expand to show input when visible
            transition: "width 0.3s ease", // Smooth transition for expansion
          }}
        >
          <IconButton sx={{ color: "#322625" }} onClick={toggleSearchVisibility}>
            <SearchIcon />
          </IconButton>
          {isSearchVisible && (
            <InputBase
              value={filterText}
              onChange={filterTextHandler}
              placeholder={placeholder}
              inputProps={{ "aria-label": "filter" }}
              sx={{
                ml: 1,
                flex: 1,
                color: "#322625", // Black text color
              }}
            />
          )}
        </Typography>

        {filters.map(filter => (
          <FormControl
            key={filter.key.toString()}
            sx={{
              minWidth: 120,
              backgroundColor: "#ffffff", // White background
              borderRadius: 1,
            }}
          >
            <InputLabel
              sx={{
                color: filter.key === filterKey ? "#322625" : "#322625", // Black text color when filled
                backgroundColor: filter.key === filterKey ? "#fdc936" : "transparent", // Yellow background when filled
                px: 1, // Add some padding to the label for better visibility
                "&.Mui-focused, &.MuiFormLabel-filled": {
                  color: "#322625", // Black text color when focused or filled
                  backgroundColor: "#fdc936", // Yellow background when focused or filled
                },
              }}
            >
              {filter.label}
            </InputLabel>
            <Select
              value={filter.key === filterKey ? filterValue : ""}
              onChange={e => handleSelectChange(filter.key, e.target.value as string | number)}
              displayEmpty
              sx={{
                color: "#322625", // Black text color
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c0e3e5", // Blue border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fdc936", // Yellow border color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fdc936", // Yellow border color on focus
                },
              }}
            >
              {filter.values.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Typography>
    </Box>
  );
}

export default Filters;
