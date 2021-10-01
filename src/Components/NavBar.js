import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import logo from "../logo/logo_cropped.png";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
  },
  appbar: {
    backgroundColor: "#673AB7",
    fontFamily: "Nunioto",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  title: {
    color: "#fff",
    fontFamily: "Nunioto",
  },
}));

export default function NavBar() {
  // const [user, setUser] = useState("");
  // const userDisp = async () => {
  //   await axios.get("/users").then((res) => {
  //     console.log(res);
  //     return setUser(res.data);
  //   });
  // };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1>
            <img src={logo} alt="senpai" height="36" width="auto" />
          </h1>
        </Toolbar>
      </AppBar>
      {/* <button onClick={() => userDisp()}>User Test</button>*/}
    </div>
  );
}
