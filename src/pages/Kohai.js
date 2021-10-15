import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";

const useStyles = makeStyles(() => ({
  main: {
    height: "90vh",
    paddingTop: "50px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  left: {
    height: "80vh",
    backgroundColor: "#424242",
    borderRadius: "4px",
    padding: "30px",
    minWidth: "260px",
    maxWidth: "260px",
    margin: "1rem",
  },
  avatarHolder: {
    height: "25vh",
    padding: "10px",
  },
  kohaiPhoto: {
    width: 150,
    height: 150,
  },
  right: {
    height: "80vh",
    backgroundColor: "#424242",
    borderRadius: "4px",
    padding: "10px",
    margin: "1rem",
  },
  preview: {
    overflow: "hidden",
    borderRadius: "4px",
    width: "48%",
    margin: "1rem",
  },
}));

const Kohai = () => {
  const user = useRecoilValue(userState);
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box>
          <Grid container xs={12}>
            <Grid
              container
              justify="flex-end"
              style={{
                textAlign: "right",
                marginTop: "2.5vh",
                marginBottom: "-6vh",
                marginRight: "6.5vw",
              }}
            >
              <Link to={{ pathname: `/edit/${user._id}` }}>
                <Button style={{ backgroundColor: "#673AB7" }}>
                  Edit Profile
                </Button>
              </Link>
            </Grid>
            <Grid
              className={classes.main}
              container
              xs={12}
              justifyContent="center"
            >
              <Grid className={classes.left} item xs={3}>
                <Typography variant="h2">{user.name}</Typography>
                <Grid
                  className={classes.avatarHolder}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid>
                    <Avatar
                      className={classes.kohaiPhoto}
                      alt="kohai"
                      src={user.avatar}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.details}>
                  {user.twitter || user.linkedIn || user.facebook ? (
                    <Typography variant="h5" component="div">
                      Socials:
                      <div>
                        {user.twitter ? (
                          <a
                            target="_blank"
                            href={`${user.twitter}`}
                            rel="noreferrer"
                          >
                            <Button>
                              <TwitterIcon />
                            </Button>
                          </a>
                        ) : null}
                        {user.linkedIn ? (
                          <a
                            target="_blank"
                            href={`${user.linkedIn}`}
                            rel="noreferrer"
                          >
                            <Button>
                              <LinkedInIcon />
                            </Button>
                          </a>
                        ) : null}
                        {user.facebook ? (
                          <a
                            target="_blank"
                            href={`${user.facebook}`}
                            rel="noreferrer"
                          >
                            <Button>
                              <FacebookIcon />
                            </Button>
                          </a>
                        ) : null}
                        {user.instagram ? (
                          <a
                            target="_blank"
                            href={`${user.instagram}`}
                            rel="noreferrer"
                          >
                            <Button>
                              <InstagramIcon />
                            </Button>
                          </a>
                        ) : null}
                      </div>
                    </Typography>
                  ) : null}
                  {user.email ? (
                    <div>
                      <Typography variant="h5">Email:</Typography>
                      <Typography variant="h6">
                        <a href={user.email}>{user.email}</a>
                      </Typography>
                    </div>
                  ) : null}
                  {user.website ? (
                    <div>
                      <Typography variant="h5">Personal Website:</Typography>
                      <Typography variant="h6">
                        <a
                          target="_blank"
                          href={`${user.website}`}
                          rel="noreferrer"
                        >
                          <a>{user.website}</a>
                        </a>
                      </Typography>
                    </div>
                  ) : null}
                  {user.location ? (
                    <Typography variant="h5">
                      Location: {user.location}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container className={classes.right} xs={8}>
                <Grid item>
                  <Typography variant="h3">About me</Typography>
                  <Typography variant="h6" component="p">
                    {user.bio}
                  </Typography>
                </Grid>
                <Grid
                  container
                  xs={12}
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ margin: "2rem" }}
                >
                  <Grid item className={classes.preview} xs={5}>
                    <img
                      height="100%"
                      width="100%"
                      alt="sample"
                      src="https://www.artbyalysia.com/uploads/6/1/6/5/61653353/27023428-1705695196158558-2154114196634259748-o_orig.jpg"
                    />
                  </Grid>
                  <Grid item className={classes.preview} xs={5}>
                    <img
                      height="100%"
                      width="100%"
                      alt="sample"
                      src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1672&q=80"
                    />
                  </Grid>
                  <Grid item className={classes.preview} xs={5}>
                    <img
                      height="100%"
                      width="100%"
                      alt="sample"
                      src="https://images.unsplash.com/photo-1581016327131-6cf17ab1f2c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    />
                  </Grid>
                  <Grid item className={classes.preview} xs={5}>
                    <img
                      height="100%"
                      width="100%"
                      alt="sample"
                      src="https://images.unsplash.com/photo-1547476547-82f7fbe9988f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1752&q=80"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default Kohai;
