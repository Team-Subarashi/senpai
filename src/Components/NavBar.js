import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Collapse } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import logo from '../logo/logo_cropped.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
        fontFamily: 'Nunioto'
    },
    appbar: {
        backgroundColor: '#673AB7',

    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
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

    // const [user, setUser] = useState("");
    // const userDisp = async () => {
    //   await axios.get("/users").then((res) => {
    //     console.log(res);
    //     return setUser(res.data);
    //   });
    // };

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle}> <img src={logo} alt="senpai" height="36" width="auto" /></h1>
                    <IconButton>
                        <SortIcon className={classes.icon} />
                    </IconButton>
                </Toolbar>
            </AppBar>


            <div className={classes.container}>
                <h1 className={classes.title}>Welcome to <br /> Senpai</h1>
                <IconButton>
                    <ExpandMoreIcon className={classes.goDown} />
                </IconButton>
                {/* <button onClick={() => userDisp()}>User Test</button>*/}
            </div>

        </div>
    )
}

export default NavBar
