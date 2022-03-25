import { createTheme } from "@mui/material/styles";

export interface IColors {
  primary: {
    main: string;
    light: string;
  };
  success: {
    main: string;
    light: string;
  };
  error: {
    main: string;
    light: string;
  };
}

const palette: IColors = {
  primary: {
    main: "#1271bb",
    light: "#D6E9F7",
  },
  success: {
    main: "#28a745",
    light: "",
  },
  error: {
    main: "#ff0000",
    light: "",
  },
};

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: "4%",
          paddingRight: "4%",
          borderRadius: 0,
          // boxShadow: "none"
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
