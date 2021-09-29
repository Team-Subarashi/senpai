import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import SignUp from "./components/SignUp"
import { atom, useRecoilState } from 'recoil';

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      Hello World
      <SignUp setUser={setUser} />
      {user === null ? "null" : "notnull"}
    </div>
  );
}

export default App;
