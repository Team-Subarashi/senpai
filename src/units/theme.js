import createTheme  from '@material-ui/core/styles/createTheme';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6737b8',
    },
    background: {
      default: '#131417'
    },
    type: 'dark',
  },
  contrastThreshhold: 3,
  tonalOffset: 0.2,
  shape: {
    borderRadius: "4px"
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
      fontFamily: "Nunito",
      fontSize: "2rem",
      color: "white",
    },
    h3: {
      fontFamily: "Nunito",
      fontSize: "1.8rem",
      color: "white",
      textAlign: "left",
    },
    h4: {
      fontFamily: "Nunito",
      fontSize: "1.6rem",
      color: "white",
    },
    h5: {
      fontFamily: "Nunito",
      fontSize: "1.4rem",
      color: "white",
      textAlign: "left",
    },
    h6: {
      fontFamily: "Nunito",
      fontSize: "1.2rem",
      color: "white",
      textAlign: "left",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      }
    }
  }
});

export default theme;