import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Splash() {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.title}>
        Welcome to <br /> Senpai
      </h1>
    </div>
  );
}
