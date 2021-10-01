import './App.css';
import NavBar from "./components/NavBar.js"
import Splash from "./Pages/Splash"
import Profile from "./Pages/Profile"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import {useEffect, useState} from 'react'
import {auth} from './firebase'
import { onAuthStateChanged } from '@firebase/auth';
import SenpaiProfileView from './Pages/SenpaiProfileView';
import FindASenpai from './Pages/FindASenpai';
import { useRecoilState } from 'recoil';
import { userState } from './Atoms';
import ScheduleBooking from './Pages/ScheduleBooking';
import axios from 'axios';


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
    })
  }, [])

  
  
  return (
    // <Router>
      <div className="App">
        <Router>

          <NavBar />
          {user.email ? "Signed in as " + user.email : null}
          
          {/* <Route path="/home">  */}
            <Splash />
          {/* </Route> */}
          {/* <Route path="/profile"> */}
            <Profile />
          {/* </Route> */}
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={SignIn} />
              <Route path="/findasenpai" component={FindASenpai} />
              <Route exact path="/senpais/:senpaiId" component={SenpaiProfileView} />
              <Route exact path="/senpais/:senpaiId/schedule" component={ScheduleBooking} />
            </Switch>
          </Router>

      </div>
    // </Router>
  );
}

export default App;
