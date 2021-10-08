import React, { useEffect } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { FormControl, InputLabel, Input } from "@mui/material";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms";

export default function Edit() {
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <Grid container style={{ fontFamily: "Nunito" }}>
      <Grid
        item
        xs={12}
        style={{
          marginLeft: "40%",
          marginRight: "40%",
          marginTop: "5vh",
          marginBottom: "2vh",
          height: "5vh",
          borderRadius: "4px",
          backgroundColor: "#673AB7",
        }}
      >
        <h1 style={{ fontWeight: "bold", color: "#fff", marginTop: "0.5vh" }}>
          Edit Profile
        </h1>
      </Grid>
      <Grid
        container
        alignItems="center"
        style={{
          backgroundColor: "#424242",
          borderRadius: "4px",
          padding: "0.5%",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginLeft: "40%",
            marginRight: "40%",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
            backgroundColor: "#673AB7",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "#fff", marginTop: "1vh" }}>
            Socials
          </h2>
        </Grid>
        <Grid container direction="column">
          <Box>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl color="primary" style={{ color: "#fff" }}>
                <InputLabel style={{ color: "#fff" }}>Twitter</InputLabel>
                <Input id="twitter" />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <InputLabel>LinkedIn</InputLabel>
                <Input id="linkedin" />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <InputLabel>Facebook</InputLabel>
                <Input id="facebook" />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <InputLabel>Instagram</InputLabel>
                <Input id="instagram" />
              </FormControl>
            </Grid>
          </Box>
          <Grid item xs={3} style={{ marginLeft: "40vw" }}>
            <Button
              style={{
                height: "4vh",
                width: "7vw",
                backgroundColor: "#673AB7",
              }}
            >
              Save Socials
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        style={{
          backgroundColor: "#424242",
          borderRadius: "4px",
          padding: "0.5%",
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "2vh",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginLeft: "40%",
            marginRight: "40%",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
            backgroundColor: "#673AB7",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "#fff", marginTop: "1vh" }}>
            Bio
          </h2>
        </Grid>
        <Grid container direction="column">
          <Box>
            <input style={{ height: "28vh", width: "95%" }}></input>
          </Box>
          <Grid item xs={3} style={{ marginLeft: "40vw", marginTop: "0.5vh" }}>
            <Button
              style={{
                height: "4vh",
                width: "7vw",
                backgroundColor: "#673AB7",
              }}
            >
              Update Bio
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
