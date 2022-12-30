import React from "react";
import { createTheme, colors, ThemeProvider, CssBaseline } from "@mui/material";

const pinkTheme = createTheme({
  palette: {
    primary: {
      main: colors.grey[50],
    },
    secondary: {
      main: "#AEECEF",
    },
    text: {
      primary: colors.grey[50],
    },
    background: {
      default: "#F4BBD3",
      paper: "#F686BD",
    },
  },
});

const CustomTheme = ({ children }) => {
  return (
    <ThemeProvider theme={pinkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomTheme;
