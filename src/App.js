import "./App.css";
import NavBar from "./components/NavBar.js";
import Splash from "./pages/Splash";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import SignOut from "./components/SignOut";

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

  return (
    <div className="App">
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
