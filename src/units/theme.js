import { createTheme } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
      secondary: '#616161',
      contrastText: '#EEEEEE'
    },
    type: 'dark'
  },
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
    h1: {
      fontFamily: "Nunito",
    }
  
  }
})

export default theme;