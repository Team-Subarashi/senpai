import React, { useEffect, useState } from "react";

import axios from "axios";
import SignOut from "./SignOut"
import { Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useState("");
  const userDisp = async () => {
    await axios.get("/users").then((res) => {
      console.log(res);
      return setUser(res.data[0].name);
    });
  };
  const lessonDisp = async () => {
    await axios.get("/lessons").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div style={{display:"flex", justifyContent:"space-around"}}>
      NavBar
      <button onClick={() => userDisp()}>User Test</button>
      <button onClick={() => lessonDisp()}>Lesson Test</button>
      <p>{user}</p>
      <Link to="/login">Login</Link>
      <Link to="/findasenpai">Find a Senpai</Link>
      <SignOut />
    </div>
  );
}
