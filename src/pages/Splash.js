import React from "react";
import { makeStyles, IconButton } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import images from '../images/round_edges.png'
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "200vh",
    backgroundColor: '#616161',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  title: {
    color: "#ffff",
    fontFamily: "Nunito",

  },

  colorSenpai: {
    color: "#673AB7",

  },

  topLeft: {
    padding: "80px",
    textAlign: "left",
    fontFamily: "Nunito",
    color: "#ffff"
  },
  topRight: {
    padding: "80px",
  }
}));

export default function Splash() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <CssBaseline />

      <Grid container >
        <Grid className={classes.topLeft} item xs={6}>
          <h1 className={classes.title}>Welcome to <br /> <span className={classes.colorSenpai}>SENPAI</span></h1>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Grid>
        <Grid className={classes.topRight} item xs={6}>
          <div><img src={images} alt="img" height="350" width="auto" /></div>
        </Grid>
        <Grid item xs={12}>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </Grid>

      </Grid>

      {/* <IconButton>
        <ExpandMoreIcon className={classes.goDown} />
      </IconButton> */}
      {/* <button onClick={() => userDisp()}>User Test</button>*/}
    </div>
  );
}
