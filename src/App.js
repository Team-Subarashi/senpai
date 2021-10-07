import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Splash from "./pages/Splash";
import Search from "./pages/Search";
import Workspace from "./pages/Workspace";
import Kohai from "./pages/Kohai";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ScheduleBooking from './pages/ScheduleBooking';
import SenpaiProfileView from './pages/SenpaiProfileView';
import Checkout from './components/Checkout';
import MyLessons from './pages/MyLessons';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import {ThemeProvider} from '@mui/material/styles';
import theme from "./units/theme";
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userState } from './atoms';
import CssBaseline from "@mui/material/CssBaseline";

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <Router>
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
      </CssBaseline>
    </ThemeProvider>

  );
}

export default App;
