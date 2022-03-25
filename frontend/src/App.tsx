import { ThemeProvider } from "@mui/material";
import AppContextProvider from "context/app.context";
import React from "react";
import RouterComp from "routes/router";
import { theme } from "theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <RouterComp />
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
