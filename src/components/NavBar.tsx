import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
const customStyles = {
  root: {
    display: "flex",
    gap: "16px",
    backgroundColor: "#322625",
    padding: "12px 20px",
    borderRadius: 4,
    border: "2px #c0e3e5 solid",
  },
  activeBtn: {
    backgroundColor: "#fdc936",
    color: "#322625",
    cursor: "default",
  },
  normalBtn: {
    backgroundColor: "#c0e3e5",
    color: "#322625",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fdc936",
    },
  },
};
const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the current active page
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={customStyles.root}>
      <Button
        variant="contained"
        onClick={() => navigate("/users")}
        sx={isActive("/users") ? customStyles.activeBtn : customStyles.normalBtn}
      >
        Users
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/products")}
        sx={isActive("/products") ? customStyles.activeBtn : customStyles.normalBtn}
      >
        Products
      </Button>
    </Box>
  );
};

export default NavBar;
