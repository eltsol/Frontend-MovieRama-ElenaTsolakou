import { colors } from "@material-ui/core";
import { createTheme, alpha } from "@material-ui/core/styles";

const theme = createTheme({
  //Declare Theme Palette
  palette: {
    type: "dark",
    primary: {
      main: "#F5C518",
      dark: "be9500",
      light: "fff857",
    },
    secondary: {
      main: "#1848f5",
      dark: "#0020c1",
      light: "#6f74ff",
    },
    warning: {
      main: "#EF8E00",
    },
    success: {
      main: "#00897B",
    },
    error: {
      main: "#A7004B",
    },
    info: {
      main: "#5E35B1",
    },
    text: {
      primary: alpha(colors.common.white, 0.87),
      secondary: alpha(colors.common.white, 0.54),
      disabled: alpha(colors.common.white, 0.38),
    },
    divider: alpha(colors.common.black, 0.12),
  },
  //Declare Theme Typography
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: 98,
      fontWeight: 300,
      lineHeight: "114px",
      letterSpacing: -0.147,
    },
    h2: {
      fontSize: 61,
      fontWeight: 400,
      lineHeight: "72px",
      letterSpacing: -0.0305,
    },
    h3: {
      fontSize: 49,
      fontWeight: 500,
      lineHeight: "56px",
      letterSpacing: 0,
    },
    h4: {
      fontSize: 35,
      fontWeight: 500,
      lineHeight: "42px",
      letterSpacing: 0.00875,
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: "28px",
      letterSpacing: 0,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: "24px",
      letterSpacing: 0.003,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "18px",
      letterSpacing: 0.0024,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: 0.0014,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "18px",
      letterSpacing: 0.008,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "18px",
      letterSpacing: 0.0035,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "14px",
      letterSpacing: 0.0048,
    },
    overline: {
      fontSize: 10,
      fontWeight: 500,
      lineHeight: "12px",
      letterSpacing: 0.015,
    },
    button: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: 0.0175,
      textTransform: "unset",
    },
  },
  //Declare Theme Shape where it's applicable
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
      size: "large",
      disableRipple: true,
      disableElevation: true,
    },
  },
  //Overriding  Material UI props
  overrides: {
    MuiFilledInput: {
      input: {
        padding: 16,
      },
    },
    MuiInputAdornment: {
      filled: {
        "&.MuiInputAdornment-positionStart": {
          "&:not(.MuiInputAdornment-hiddenLabel)": {
            marginTop: "unset",
          },
        },
      },
    },
  },
});

export default theme;
