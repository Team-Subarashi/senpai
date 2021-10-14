import React from "react";
// import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

// const useStyles = makeStyles(() => ({
//   appbar: {
//     backgroundColor: "#424242",
//     fontFamily: "Nunito",
//     position: "absolute",
//     // bottom: "0",
//   },
//   appbarWrapper: {
//     display: "flex",
//     justifyContent: "space-evenly",
//   },
// }));

export default function Footer() {
  //   const classes = useStyles();

  return (
    <div className="footer">
      <Box id="navbar" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <Link to={`/`} style={{ color: "white" }}>
              <Typography variant="h4">SENPAI</Typography>
            </Link> */}
            <Link to={`/info`} style={{ color: "white" }}>
              <Typography variant="h4">About Us</Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>

    // <Grid container>
    //   <Grid
    //     item
    //     xs={12}
    //     style={{
    //       position: "relative",
    //       bottom: "0px",
    //       height: "50px",
    //       backgroundColor: "#424242",
    //     }}
    //   >
    //     This is a footer
    //   </Grid>
    // </Grid>
  );
}
