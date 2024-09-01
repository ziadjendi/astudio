import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c0e3e5", // Blue
      contrastText: "#322625", // Black text
    },
    secondary: {
      main: "#fdc936", // Yellow
      contrastText: "#322625", // Black text
    },
    background: {
      default: "#ebebeb", // Grey background
      paper: "#ffffff", // White background for paper elements
    },
    text: {
      primary: "#322625", // Black text
      secondary: "#c0e3e5", // Blue text for secondary elements
    },
    divider: "#c0e3e5", // Blue divider
  },
  typography: {
    fontFamily: "Neutra Text, sans-serif",
    h6: {
      color: "#322625", // Black text for headers
    },
    body1: {
      color: "#322625", // Black text for main content
    },
    body2: {
      color: "#c0e3e5", // Blue for secondary text
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#322625", // Black background for table headers
          "& .MuiTableCell-root": {
            color: "#fdc936", // Yellow text in table headers
            fontWeight: "bold",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#fdc936", // Yellow checkboxes when checked in the table body
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#fdc936", // Yellow background for selected rows
            "&:hover": {
              backgroundColor: "#ebebeb", // Grey background on hover if selected
            },
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "#fdc936", // Yellow for sort labels
          "&:hover": {
            color: "#ffffff", // White on hover
          },
          "&.Mui-active": {
            color: "#ffffff", // White for the active sort label
          },
        },
        icon: {
          color: "#ffffff", // White for the sort icon
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#fdc936", // Yellow checkboxes by default
          "&.Mui-checked": {
            color: "#322625", // Black checkboxes when checked in the table body
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: "#322625", // Black background for pagination
          color: "#fdc936", // Yellow text for pagination labels
        },
        selectIcon: {
          color: "#fdc936", // Yellow for the select dropdown icon
        },
        actions: {
          color: "#fdc936", // Yellow for pagination arrows and buttons
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // White background for paper elements
          color: "#322625", // Black text
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ebebeb", // Light grey background
          color: "#322625", // Black text
          borderRadius: "4px",
          padding: "0 8px",
          border: "1px solid #c0e3e5", // Blue border
          "&:hover": {
            borderColor: "#fdc936", // Yellow border on hover
          },
          "&.Mui-focused": {
            borderColor: "#fdc936", // Yellow border on focus
          },
        },
        input: {
          "::placeholder": {
            color: "rgba(50, 38, 37, 0.6)", // Lighter black placeholder text
          },
        },
      },
    },
  },
});

export default theme;
