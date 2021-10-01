import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import logo from '../logo/logo_cropped.png'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh'
    },
    appbar: {
        backgroundColor: '#673AB7',
        fontFamily: 'Nunioto'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
    },
    title: {
        color: '#fff',
        fontFamily: 'Nunioto'
    }
}))

const NavBar = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1><img src={logo} alt="senpai" height="36" width="auto" /></h1>
                </Toolbar>
            </AppBar>
            <div>
                <h1 className={classes.title}>Welcome to <br /> Senpai</h1>
            </div>

        </div>
    )
}

export default NavBar
