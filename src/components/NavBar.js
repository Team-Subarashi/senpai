import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../logo/logo_cropped.png";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";

const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: "#673AB7",
    fontFamily: "Nunito",
    position: "relative",
    height: "100%"
  },
  appbarWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const NavBar = ({ user }) => {
  const classes = useStyles();

  const signOutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <Box id="navbar" sx={{ flexGrow: 1, height: "8vh"}}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <Link to={`/`} style={{ color: "white" }}>
            <img src={logo} alt="senpai" height="36" width="auto" />
          </Link>
          <Link
            to={user.name ? `/kouhai/${user._id}` : "/login"}
            style={{ color: "white" }}
          >
              Profile
          </Link>
          <Link
            to={user._id ? `/myLessons` : "/login"}
            style={{ color: "white" }}
          >
              My Lessons
          </Link>
          <Link to={`/search`} style={{ color: "white" }}>
              Find a Senpai
          </Link>
          {user.name ? (
            user.email
          ) : (
            <Link to="/signup" style={{ color: "white" }}>
                Create an Account
            </Link>
          )}
          {!user.email ? (
            <Link to="/login" style={{ color: "white" }}>
                Sign in
            </Link>
          ) : (
            <Link to="/" onClick={signOutHandler} style={{ color: "white" }}>
                Sign Out
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
