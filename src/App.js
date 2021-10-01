//import './index.css'
import './App.css';
import Splash from "./pages/Splash"
import Profile from "./pages/Profile"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import NavBar from './components/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#616161',
    backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
  }
}));

function App() {
  const classes = useStyles()
  return (
    // <Router>
    <div className={classes.root}>
      <CssBaseline />

      <NavBar />



      <Splash />
      {/* </Route> */}
      {/* <Route path="/profile"> */}
      <Profile />
      {/* </Route> */}

    </div>
    // </Router>
  );
}

export default App;
