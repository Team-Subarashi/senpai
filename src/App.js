//import './index.css'
import "./App.css";
import NavBar from "./components/NavBar.js";
import Splash from "./pages/Splash";
import Search from "./pages/Search";
import Workspace from "./pages/Workspace";

import Kohai from "./pages/Kohai";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import React, { useEffect, useState } from "react";
//import Room from "./components/CodeRoom/Room";
import { ThemeProvider } from '@material-ui/core';
import theme from "./units/theme";
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userState } from './atoms';
import ScheduleBooking from './pages/ScheduleBooking'
import SenpaiProfileView from './pages/SenpaiProfileView'
import Checkout from './components/Checkout'
import MyLessons from './pages/MyLessons'

const useStyles = makeStyles((theme) => ({
  // root: {
  //   minHeight: "100vh",
  //   backgroundColor: "#616161",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  // },
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
        if (response.data) {
          console.log(response.data)
          setUser(response.data)
        }
      } else {
        setUser({
          id: null,
          email: null
        })
      }
    });
  }, []);

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      {/* // <Router> */}

      <div className="App">
        {/* <div > */}
        <div className={classes.root}>
          <Router>

            <CssBaseline />

            <NavBar user={user} />
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/signup" component={SignUp} />
              <Route exact path="/kouhai/:id" component={Kohai} />
              <Route path="/login" component={SignIn} />
              <Route exact path="/senpai/:id" component={SenpaiProfileView} />
              <Route path="/senpai/:id/schedule" component={ScheduleBooking} />
              <Route path="/search" component={Search} />
              <Route path="/room" component={Workspace} />
              <Route path="/checkout/:senpaiId/:lessonId" component={Checkout} />
              <Route path="/mylessons" component={MyLessons} />
            </Switch>
          </Router>
        </div>
      </div>
      {/* // </Router> */}
    </ThemeProvider>
  );
}

export default App;
