import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MainRouter } from "./router/MainRouter";

export const App = () => {
  const apptheme = createTheme({
    typography: {
      fontFamily: ["M PLUS 1p", "sans-serif"].join(","),
    },
  });
  return (
    <ThemeProvider theme={apptheme}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
