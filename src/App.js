
import "./App.css";
import NavBar from "./components/NavBar.js";
import Splash from "./Pages/Splash";
import Profile from "./Pages/Profile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOut from "./components/SignOut";
import Room from "./components/CodeRoom/Room";

function App() {
  const [accountView, setAccountView] = useState("createAccount");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("hello");
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(user.email);
      } else {
        setUser(null);
        console.log("User not selected");
      }
    });
  }, []);


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
            <Route path="/room" component={Room} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </Router>

      </div>

    </div>
    // </Router>
  );
}

export default App;
