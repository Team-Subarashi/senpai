import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6737b8',
    },
    background: {
      default: '#616161'
    },
    type: 'dark',
  },
  contrastThreshhold: 3,
  tonalOffset: 0.2,
  shape: {
    borderRadius: "4px"
  },
  spacing: 4,
  text : {
    primary: "#fff",
    secondary: "rgba(255,255,255,0.7)"
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,  
    landingTitle: {
      fontFamily: "Nunito",
      fontSize: "3.5rem",
    },
    landingContent: {
      fontFamily: "Nunito",
      fontSize: "1rem",
    },
    navbar: {
      fontFamily: "Nunito",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      }
    }
  }
})

export default theme;