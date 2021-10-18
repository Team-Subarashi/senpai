import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Vanta from "../components/Vanta";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(6),
  },
  title: {
    fontFamily: "Nunito",
    fontSize: "3.5rem",
    textAlign: "left",
  },
  content: {
    fontFamily: "Nunito",
    fontSize: "1rem",
    textAlign: "left",
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function Splash() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Vanta>
      <div
        style={{
          height: "92%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid className={classes.padding} container>
          <Grid item xs={6} className={classes.padding}>
            <Typography className={classes.title}>Welcome to</Typography>
            <Typography
              className={classes.title}
              style={{ color: theme.palette.primary.main }}
            >
              SENPAI
            </Typography>
            <Typography className={classes.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Box component="div" className={classes.padding}>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/login"
              >
                Get started
              </Button>
            </Box>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            xs={6}
            className={classes.padding}
          >
            <img
              src="https://i.imgur.com/HKga5Hs.png"
              alt="img"
              style={{ width: "100%", maxWidth: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
        <Container className={classes.padding}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Container>
      </div>
    </Vanta>
  );
}
