import createTheme from "@material-ui/core/styles/createTheme";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6737b8",
    },
    secondary: {
      main: "#2ac3de",
    },
    background: {
      // default: '#616161'
      default: "#23242D",
    },
    type: "dark",
  },
  contrastThreshhold: 3,
  tonalOffset: 0.2,
  shape: {
    borderRadius: "4px",
  },
  spacing: 4,
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "Nunito",
      fontSize: "2.5rem",
      color: "white",
      textAlign: "left",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bolder",
      color: "white",
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: "bold",
      color: "white",
      textAlign: "left",
      lineHeight: 2,
    },
    h4: {
      fontSize: "1.4rem",
      color: "white",
    },
    h5: {
      fontSize: "1.2rem",
      color: "white",
      textAlign: "left",
    },
    h6: {
      fontSize: "1.1rem",
      color: "white",
      textAlign: "left",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
});

export default theme;
