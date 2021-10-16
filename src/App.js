import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Checkout from "./components/Checkout";
import Splash from "./pages/Splash";
import Search from "./pages/Search";
import Workspace from "./components/CodeRoom/Workspace";
import ScheduleBooking from "./pages/ScheduleBooking";
import SenpaiProfileView from "./pages/SenpaiProfileView";
import Kohai from "./pages/Kohai";
import MyLessons from "./pages/MyLessons";
import Edit from "./pages/Edit";
import SenpaiSettings from "./pages/SenpaiSettings";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "./atoms";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./units/theme";
import Messages from "./components/message/Messages";

function App() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await axios({
          method: "get",
          url: `/api/v1/firebase/${user.uid}`,
        });
        if (response.data) {
          setUser(response.data);
        }
      } else {
        setUser({
          id: null,
          email: null,
        });
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router hashType="slash">
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
            <Route path="/messages" component={Messages} />
            <Route path="/edit" component={Edit} />
            <Route path="/senpai-settings" component={SenpaiSettings} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
