//import './index.css'
import "./App.css";
import NavBar from "./components/NavBar.js";
import Splash from "./pages/Splash";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Workspace from "./pages/Workspace";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userState } from './atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#616161",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function App() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await axios({
          method: "get",
          url: `/users/${user.uid}`,
          data: {
            authId: user.uid
          }
        })
        if (response.data[0]) {
          setUser(response.data[0])
        }
      } else {
        setUser({
          id: null,
          email: null
        })
        console.log("User not selected")
      }
    });
  }, []);

  const classes = useStyles();
  return (
    // <Router>
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />

        <NavBar />
        {user ? user.email : null}
        <SignOut />
        <Router>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={Search} />
            <Route path="/room" component={Workspace} />
          </Switch>
        </Router>
      </div>
    </div>
    // </Router>
  );
}

export default App;
