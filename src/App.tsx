import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AppRoutes from "./routes";
import theme from "./Theme";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
