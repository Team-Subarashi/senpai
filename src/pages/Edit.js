import React, {
  //  useState,
  useEffect,
} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  FormControl,
  //  InputLabel,
  Input,
} from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, repositoriesState } from "../atoms";
import { makeStyles } from "@material-ui/core/styles";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
  addRepo: {},
}));

export default function Edit() {
  const user = useRecoilValue(userState);
  // const [linkedIn, setLinkedIn] = useState("LinkedIn");
  // const [twitter, setTwitter] = useState("Twitter");
  // const [facebook, setFacebook] = useState("Facebook");
  // const [website, setWebsite] = useState("Personal Website");
  const [repositories, setRepositories] = useRecoilState(repositoriesState);
  const [userRepositories, setUserRepositories] = React.useState([]);
  const [repoTitle, setRepoTitle] = React.useState("");
  const [repoUrl, setRepoUrl] = React.useState("");
  const [repoDesc, setRepoDesc] = React.useState("");
  const classes = useStyles();

  useEffect(() => {
    setUserRepositories(
      repositories.filter((repository) => repository.userId === user._id)
    );
  }, [repositories]);

  useEffect(() => {
    if (user.linkedIn) {
      // setLinkedIn(user.linkedIn);
      document.getElementById("linkedin").value = user.linkedIn;
    } else {
      return;
    }
    if (user.twitter) {
      // setTwitter(user.twitter);
      document.getElementById("twitter").value = user.twitter;
    } else {
      return;
    }
    if (user.facebook) {
      // setFacebook(user.facebook);
      document.getElementById("facebook").value = user.facebook;
    } else {
      return;
    }
    if (user.github) {
      document.getElementById("github").value = user.github;
    } else {
      return;
    }
    if (user.website) {
      // setWebsite(user.website);
      document.getElementById("website").value = user.website;
    }
    if (user.avatar) {
      document.getElementById("avatar").value = user.avatar;
    } else {
      return;
    }
  }, [user]);

  const repoTitleHandler = (e) => {
    setRepoTitle(e.target.value);
  };
  const repoUrlHandler = (e) => {
    setRepoUrl(e.target.value);
  };
  const repoDescHandler = (e) => {
    setRepoDesc(e.target.value);
  };

  const addRepoHandler = async () => {
    await axios({
      method: "post",
      url: "/api/v1/repositories",
      data: {
        userId: user._id,
        title: repoTitle,
        url: repoUrl,
        description: repoDesc,
      },
    });
    const repos = await axios({
      method: "get",
      url: `/api/v1/repositories`,
    });
    if (repos.data) {
      setRepositories(repos.data);
    }
  };

  const removeRepoHandler = async (id) => {
    await axios.delete(`/api/v1/repositories/${id}`);
    const repos = await axios({
      method: "get",
      url: `/api/v1/repositories`,
    });
    if (repos.data) {
      setRepositories(repos.data);
    }
  };

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
        id="social-grid"
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
            marginTop: "1vh",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#2ac3de",
            }}
          >
            Socials
          </h1>
        </Grid>
        <Grid container direction="column">
          <Box>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                {/* <InputLabel style={{ color: "#fff" }}>{twitter}</InputLabel> */}
                <Input
                  id="twitter"
                  placeholder="Twitter URL"
                  style={{ color: "#fff" }}
                  // value={twitter}
                />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                {/* <InputLabel style={{ color: "#fff" }}>{linkedIn}</InputLabel> */}
                <Input
                  id="linkedin"
                  placeholder="LinkedIn URL"
                  style={{ color: "#fff" }}
                  // value={linkedIn}
                />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                {/* <InputLabel style={{ color: "#fff" }}>{facebook}</InputLabel> */}
                <Input
                  id="facebook"
                  placeholder="Facebook URL"
                  style={{ color: "#fff" }}
                  // value={facebook}
                />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                <Input
                  id="github"
                  placeholder="Github URL"
                  style={{ color: "#fff" }}
                />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                {/* <InputLabel style={{ color: "#fff" }}>{website}</InputLabel> */}
                <Input
                  id="website"
                  placeholder="Personal Website URL"
                  style={{ color: "#fff" }}
                  // value={website}
                />
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: "1vh" }}>
              <FormControl>
                {/* <InputLabel style={{ color: "#fff" }}>{website}</InputLabel> */}
                <Input
                  id="avatar"
                  placeholder="Avatar URL"
                  style={{ color: "#fff" }}
                  // value={website}
                />
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
                  github: document.getElementById("github").value,
                  website: document.getElementById("website").value,
                  avatar: document.getElementById("avatar").value,
                  // instagram: document.getElementById("instagram").value,
                };
                axios({
                  method: "patch",
                  url: `/api/v1/users/${user._id}`,
                  data: {
                    facebook: body.facebook,
                    github: body.github,
                    linkedIn: body.linkedin,
                    twitter: body.twitter,
                    website: body.website,
                    avatar: body.avatar,
                    // instagram: body.instagram,
                  },
                });

                let successMessage = document.createElement("div");
                successMessage.innerText = "Profile updated!";
                successMessage.style.color = "white";
                successMessage.style.position = "absolute";
                successMessage.style.marginLeft = "12.5vw";
                successMessage.style.fontWeight = "bold";
                successMessage.style.fontSize = "large";
                successMessage.style.backgroundColor = "#4BB543";
                successMessage.style.width = "25%";
                successMessage.style.height = "5vh";
                successMessage.style.paddingTop = "1vh";

                document.getElementById("social-grid").append(successMessage);

                setTimeout(() => {
                  window.location.reload();
                }, 750);
              }}
              style={{
                height: "4vh",
                width: "7vw",
                backgroundColor: "#673AB7",
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        id="bio-grid"
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
            marginTop: "1vh",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#2ac3de",
            }}
          >
            Bio
          </h1>
        </Grid>
        <Grid container direction="column">
          <Box>
            <textarea
              id="bio-input"
              placeholder="Tell us a little about yourself!"
              defaultValue={user.bio ? user.bio : null}
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
                successMessage.style.position = "absolute";
                successMessage.style.marginTop = "-21vh";
                successMessage.style.marginLeft = "12.5vw";
                successMessage.style.fontWeight = "bold";
                successMessage.style.fontSize = "large";
                successMessage.style.backgroundColor = "#4BB543";
                successMessage.style.width = "25%";
                successMessage.style.height = "5vh";
                successMessage.style.paddingTop = "1vh";

                document.getElementById("bio-grid").append(successMessage);

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
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        id="interest-grid"
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
            marginTop: "1vh",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#2ac3de",
            }}
          >
            Interests
          </h1>
        </Grid>
        <Grid container direction="column">
          <Box>
            <textarea
              id="interest-input"
              placeholder="Tell us a little about your interests!"
              defaultValue={user.interests ? user.interests : null}
              style={{ height: "28vh", width: "95%", color: "black" }}
            ></textarea>
          </Box>
          <Grid item xs={3} style={{ marginLeft: "40vw", marginTop: "0.5vh" }}>
            <Button
              id="interest-button"
              onClick={() => {
                let value = document.getElementById("interest-input").value;
                if (value.length <= 500) {
                  axios({
                    method: "patch",
                    url: `/api/v1/users/${user._id}`,
                    data: {
                      interests: value,
                    },
                  });
                } else {
                  window.alert("Please use 500 characters or less");
                  return;
                }
                let successMessage = document.createElement("div");
                successMessage.innerText = "Interests updated!";
                successMessage.style.color = "white";
                successMessage.style.position = "absolute";
                successMessage.style.marginTop = "-21vh";
                successMessage.style.marginLeft = "12.5vw";
                successMessage.style.fontWeight = "bold";
                successMessage.style.fontSize = "large";
                successMessage.style.backgroundColor = "#4BB543";
                successMessage.style.width = "25%";
                successMessage.style.height = "5vh";
                successMessage.style.paddingTop = "1vh";

                document.getElementById("interest-grid").append(successMessage);

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
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        id="repository-area"
        alignItems="center"
        style={{
          backgroundColor: "#424242",
          borderRadius: "4px",
          padding: "0.5%",
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "2vh",
          // marginBottom: "2vh",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginLeft: "40%",
            marginRight: "40%",
            marginTop: "1vh",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#2ac3de",
            }}
          >
            Repositories
          </h1>
        </Grid>
        <div style={{ width: "100%" }}>
          {userRepositories.map((repository) => (
            <div
              key={repository.url}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="h5" component="span">
                {repository.title}
              </Typography>
              <Typography variant="h5" component="span">
                {repository.url}
              </Typography>
              {/* <span>{repository.description}</span> */}
              <IconButton onClick={() => removeRepoHandler(repository._id)}>
                <RemoveCircleIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <form
          className={classes.addRepo}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TextField
            id="title"
            label="Title"
            variant="filled"
            required={true}
            onChange={repoTitleHandler}
          />
          <TextField
            id="URL"
            label="URL"
            variant="filled"
            required={true}
            onChange={repoUrlHandler}
          />
          <TextField
            id="description"
            label="Description"
            variant="filled"
            onChange={repoDescHandler}
          />
          <AddCircleIcon fontSize="large" onClick={() => addRepoHandler()} />
        </form>
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
          marginBottom: "5vh",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginTop: "1vh",
            marginBottom: "2vh",
            height: "5vh",
            borderRadius: "4px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#2ac3de",
            }}
          >
            Are you a senpai?
          </h1>
        </Grid>
        <Grid item xs={12} style={{ fontSize: "large", marginBottom: "2vh" }}>
          Are you looking to spread some knowledge?
          <br />
          <br />
          Continue to the next page to set yourself up for success and begin
          <br />
          your Senpai journey!
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "40vw" }}>
          <Link to={{ pathname: `/senpai-settings/${user._id}` }}>
            <Button
              onClick={() => {}}
              style={{
                marginTop: "1vh",
                height: "4vh",
                width: "7vw",
                backgroundColor: "#673AB7",
              }}
            >
              Settings
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
