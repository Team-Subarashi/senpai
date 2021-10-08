import React from "react";
import useTheme from "@mui/styles/useTheme";
import Grid from '@mui/material/Grid';
import images from '../images/round_edges.png'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Link from "react-router-dom/Link";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

export default function Splash() {
  const theme = useTheme();
  return (
    <>
      <Grid container >
        <Grid item xs={6} p={15}>
          <Typography variant="landingTitle" textAlign="left" component="p">Welcome to</Typography>
          <Typography variant="landingTitle" textAlign="left" component="p" color={theme.palette.primary.main}>SENPAI</Typography>
          <Typography variant="landingContent" textAlign="left" component="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
          <Box component="div" m={8}>
            <Button variant="contained" component={Link} to="/login">Get started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} p={15}>
          <img src={images} alt="img" height="350" width="auto" />
        </Grid>
      </Grid>
      <Container>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
      </Container>
    </>
  );
}
