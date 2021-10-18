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
import { userState, repositoriesState } from "../atoms";


const useStyles = makeStyles(() => ({
  main: {
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
    flexDirection: "column",
    borderRadius: "4px",
    margin: "1rem",
  },
  rightItem: {
    backgroundColor: "#424242",
    marginBottom: "1rem",
    padding: "1rem",

  }
}));

const Kohai = () => {
  const user = useRecoilValue(userState);
  const repositories = useRecoilValue(repositoriesState);
  const [userRepositories, setUserRepositories] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    setUserRepositories(repositories.filter((repository) => repository.userId === user._id));
  }, [repositories]);

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
                <Grid item className={classes.rightItem}>
                  <Typography variant="h3">About me</Typography>
                  <Typography variant="h6" component="p">
                    {user.bio}
                  </Typography>
                </Grid>
                <Grid item className={classes.rightItem}>
                  <Typography variant="h3">Interests</Typography>
                  <Typography variant="h6" component="p">
                    {user.interests}
                  </Typography>
                </Grid>
                <Grid item className={classes.rightItem}>
                  <Typography variant="h3">Repositories</Typography>
                  <Typography variant="h6" component="p">
                    {userRepositories.map((repository) => (
                      <div style={{padding: "1rem"}} key={repository.url}>
                        <Typography variant="h4" component="span">{repository.title} - </Typography>
                        <Typography variant="h6" component="span">{repository.description}</Typography>
                        <Typography variant="h6"><a href={repository.url}>{repository.url}</a></Typography>

                      </div>
                    ))}
                  </Typography>
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
