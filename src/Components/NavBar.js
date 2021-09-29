import React, { useEffect, useState } from "react";

import axios from "axios";

export default function NavBar() {
  const [user, setUser] = useState("");
  const userDisp = async () => {
    await axios.get("/users").then((res) => {
      console.log(res);
      return setUser(res.data[9].name);
    });
  };

  return (
    <div>
      NavBar
      <button onClick={() => userDisp()}>User Test</button>
      <p>{user}</p>
    </div>
  );
}
