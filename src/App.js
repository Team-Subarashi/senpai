//import './index.css'
import './App.css';
import Splash from "./pages/Splash"
import Profile from "./pages/Profile"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import SignOut from './components/SignOut';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#616161',
    backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
  }
}));

function App() {

  const [accountView, setAccountView] = useState("createAccount")
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("hello")
      if (user) {
        const uid = user.uid;
        setUser(user)
        console.log(user.email)
      } else {
        setUser(null)
        console.log("User not selected")
      }
    })
  }, [])

  const classes = useStyles()
  return (
    // <Router>
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />

        <NavBar />
        {user ? user.email : null}
        <SignOut />
        {/* <Route path="/home">  */}
        <Splash />
        {/* </Route> */}
        {/* <Route path="/profile"> */}
        <Profile />
        {/* </Route> */}
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </Router>

      </div>
    </div>
    // </Router>
  );
}

export default App;
