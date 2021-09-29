import './App.css';
import NavBar from "./components/NavBar.js"
import Splash from "./Pages/Splash"
import Profile from "./Pages/Profile"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import SignUp from './components/SignUp';
import {useState} from 'react'


function App() {
  const [user, setUser] = useState(null)

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
          {user ? "user set" : <SignUp setUser={setUser}/>}
      </div>
    // </Router>
  );
}

export default App;
