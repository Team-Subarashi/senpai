import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Tab, Tabs, Typography, AppBar, Toolbar, IconButton, Collapse, Menu, MenuList, onClose, MenuItem, ThemeProvider } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import logo from '../logo/logo_cropped.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from "axios";
import theme from "../units/theme";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { getAuth, signOut } from '@firebase/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    backgroundColor: '#673AB7',
    fontFamily: "Nunito",
    position: "relative"
  },
  appbarWrapper: {
    // width: '80%',
    display: 'flex',
    justifyContent: "space-evenly"
    // margin: '0 auto'
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  title: {
    color: '#fff',
    fontFamily: 'Nunioto',
    fontSize: "2rm"
  },
  appbarTitle: {
    flexGrow: '1'
  },
  container: {
    textAlign: 'center'
  },
  goDown: {
    color: '#fff',
    fontSize: '2rem'
  }
}))

const NavBar = ({ user }) => {
  const [value, setValue] = useState(0)
  const handleClickTab = (e, newValue) => {
    setValue(newValue)
  }
  //export default function NavBar() {
  // const [user, setUser] = useState("");
  // const userDisp = async () => {
  //   await axios.get("/users").then((res) => {
  //     console.log(res);
  //     return setUser(res.data);
  //   });
  // };

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const signOutHandler = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className={classes.appbar}  >
          <Toolbar className={classes.appbarWrapper}>
            <Typography  >
              <Link to={`/`} style={{ color: "white" }}>
                <img src={logo} alt="senpai" height="36" width="auto" />
              </Link>
            </Typography>

            {/* <div style={{ flexGrow: 1 }}></div> */}
            <Link to={user.name ? `/kouhai/${user._id}` : "/login"} style={{ color: "white" }}>Profile</Link>
            <Link to={user._id ? `/myLessons` : "/login"} style={{ color: "white" }}>My Lessons</Link>
            <Link to={`/search`} style={{ color: "white" }}>Find a Senpai</Link>
            {user.name ? user.email : <Link to="/signup" style={{ color: "white" }}>Create an Account</Link>}
            {!user.email ? <Link to="/login" style={{ color: "white" }}>Sign in</Link> : <Link to="/" onClick={signOutHandler} style={{ color: "white" }}>Sign Out</Link>}

            {/* <IconButton>
                            <SortIcon aria-controls='menu' onClick={handleOpenMenu} className={classes.icon} />
                        </IconButton> */}



          </Toolbar>
        </AppBar>


      </Box>

    </>




  )
}

export default NavBar;
