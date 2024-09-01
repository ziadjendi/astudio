import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        width: 80,
        height: 80,
        border: "8px solid",
        borderColor: "#c0e3e5", // Blue
        borderTopColor: "#fdc936", // Yellow
        borderRadius: "50%",
        animation: `${spinAnimation} 1.2s linear infinite`,
      }}
    />
  );
};

export default Loader;
