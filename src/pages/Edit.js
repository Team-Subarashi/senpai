import React, { useEffect } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Input } from "@mui/material";

import axios from "axios";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms";

export default function Edit() {
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    if (user.linkedIn) {
      document.getElementById("linkedin").value = user.linkedIn;
      document.getElementById("twitter").value = user.twitter;
      document.getElementById("facebook").value = user.facebook;
      document.getElementById("website").value = user.website;
    }
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
              <FormControl>
                <InputLabel style={{ color: "#fff" }}>Twitter</InputLabel>
                <Input id="twitter" />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <InputLabel style={{ color: "#fff" }}>LinkedIn</InputLabel>
                <Input id="linkedin" />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <InputLabel style={{ color: "#fff" }}>Facebook</InputLabel>
                <Input id="facebook" />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <InputLabel style={{ color: "#fff" }}>Website</InputLabel>
                <Input id="website" />
              </FormControl>
            </Grid>
            {/* <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
              <InputLabel style={{ color: "#fff" }}>Instagram</InputLabel>
                <Input id="instagram" />
              </FormControl>
            </Grid> */}
          </Box>
          <Grid item xs={3} style={{ marginLeft: "40vw" }}>
            <Button
              onClick={() => {
                let body = {
                  twitter: document.getElementById("twitter").value,
                  linkedin: document.getElementById("linkedin").value,
                  facebook: document.getElementById("facebook").value,
                  website: document.getElementById("website").value,
                  // instagram: document.getElementById("instagram").value,
                };
                axios({
                  method: "patch",
                  url: `/api/v1/users/${user._id}`,
                  data: {
                    facebook: body.facebook,
                    linkedIn: body.linkedin,
                    twitter: body.twitter,
                    website: body.website,
                    // instagram: body.instagram,
                  },
                });

                let successMessage = document.createElement("div");
                successMessage.innerText = "Socials updated!";
                successMessage.style.color = "white";
                successMessage.style.fontWeight = "bold";
                successMessage.style.fontSize = "large";
                successMessage.style.backgroundColor = "#4BB543";
                successMessage.style.width = "33%";
                successMessage.style.height = "5vh";
                successMessage.style.marginLeft = "33%";
                successMessage.style.paddingTop = "1vh";

                document.getElementById("navbar").append(successMessage);

                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
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
        id="bio-area"
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
            <textarea
              id="bio-input"
              placeholder="Tell us a little about yourself!"
              style={{ height: "28vh", width: "95%", color: "black" }}
            ></textarea>
          </Box>
          <Grid item xs={3} style={{ marginLeft: "40vw", marginTop: "0.5vh" }}>
            <Button
              id="bio-button"
              onClick={() => {
                let value = document.getElementById("bio-input").value;
                if (value.length <= 500) {
                  axios({
                    method: "patch",
                    url: `/api/v1/users/${user._id}`,
                    data: {
                      bio: value,
                    },
                  });
                } else {
                  window.alert("Please use 500 characters or less");
                  // document.getElementById("bio-area").prepend(
                  // <Alert severity="error">
                  //   Please use 500 characters or less
                  // </Alert>
                  // );
                  return;
                  // return (
                  // <div>
                  // <Alert severity="error">
                  //   Please use 500 characters or less
                  // </Alert>
                  // </div>
                  // );
                }
                let successMessage = document.createElement("div");
                successMessage.innerText = "Bio updated!";
                successMessage.style.color = "white";
                successMessage.style.fontWeight = "bold";
                successMessage.style.fontSize = "large";
                successMessage.style.backgroundColor = "#4BB543";
                successMessage.style.width = "33%";
                successMessage.style.height = "5vh";
                successMessage.style.marginLeft = "33%";
                successMessage.style.paddingTop = "1vh";

                document.getElementById("navbar").append(successMessage);

                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
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
      <Grid
        container
        id="senpai-area"
        alignItems="center"
        style={{
          backgroundColor: "#424242",
          borderRadius: "4px",
          padding: "0.5%",
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "2vh",
          marginBottom: "2vh",
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
            Are you a Senpai?
          </h2>
        </Grid>
        <Grid item xs={12} style={{ fontSize: "large" }}>
          Are you looking to spread some knowledge? Click here to get started on
          your journey as a senpai!
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "40vw" }}>
          <Link to={{ pathname: `/senpai-settings/${user._id}` }}>
            <Button
              onClick={() => {}}
              style={{
                height: "4vh",
                width: "7vw",
                backgroundColor: "#673AB7",
              }}
            >
              Senpai Settings
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
