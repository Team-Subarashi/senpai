import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Tab, Tabs, Typography, AppBar, Toolbar, IconButton, Collapse, Menu, MenuList, onClose, MenuItem, ThemeProvider } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import logo from '../logo/logo_cropped.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from "axios";
import theme from "../units/theme";
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appbar: {
        backgroundColor: '#673AB7',
        fontFamily: "Nunito",
    },
    appbarWrapper: {
        width: '80%',
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

const NavBar = () => {
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
    return (


        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className={classes.appbar}  >
                    <Toolbar className={classes.appbarWrapper}>

                        <Typography  >
                            <img src={logo} alt="senpai" height="36" width="auto" />
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Tabs onChange={handleClickTab} indicatorColor='secondary' value={value}>
                            <Tab disableRipple label='profile' />


                            <Tab disableRipple label='Senpai prof' />


                            <Tab disableRipple label='Find a Senpai' />


                            <Tab disableRipple label='Log Out' />
                        </Tabs>
                        {/* <IconButton>
                            <SortIcon aria-controls='menu' onClick={handleOpenMenu} className={classes.icon} />
                        </IconButton> */}
                    </Toolbar>
                </AppBar>

                {/* <Menu style={{ marginTop: '50px' }} id='menu' onClose={handleMenuClose} anchorEl={anchorEl} open={Boolean(anchorEl)}>
                    <MenuItem onClick={handleMenuClose}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        Senpai Prof
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        Find a Senpai
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        Log Out
                    </MenuItem>
                </Menu> */}
            </Box>

        </>




    )
}

export default NavBar;
