import './App.css';
import NavBar from "./Components/NavBar"
import Splash from "./Pages/Splash"
import Profile from "./Pages/Profile"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    // <Router>
      <div className="App">
        <NavBar />
          {/* <Route path="/home">  */}
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
