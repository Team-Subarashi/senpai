import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from '@material-ui/core/styles/makeStyles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";

const useStyles = makeStyles(() => ({
  main: {
    height: "100vh",
    padding: "50px",
  },
  left: {
    height: "85vh",
    backgroundColor: "#424242",
    borderRadius: "4px",
    padding: "30px",
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
    height: "85vh",
    backgroundColor: "#424242",
    borderRadius: "4px",
    padding: "30px",
  },
  preview: {
    overflow: "hidden",
    borderRadius: "4px",
    width: "48%",
    height: "45%",
  }


}));

const Kohai = () => {
  const user = useRecoilValue(userState);
  const classes = useStyles();

  return (
    <Grid
      className={classes.main}
      container
      xs={12}
      justifyContent="space-between"
    >
      <Grid
        className={classes.left}
        item
        xs={3}
      >
        <Typography variant="h2">
          {user.name}
        </Typography>
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
                {user.twitter ? <a ><TwitterIcon /></a> : null}
                {user.linkedIn ? <a ><LinkedInIcon /> </a> : null}
                {user.facebook ? <a ><FacebookIcon /></a> : null}
                {user.facebook ? <a ><InstagramIcon /></a> : null}
              </div>
            </Typography>
          ) : null}
          {user.email ? (
            <div>
              <Typography variant="h5">Email:</Typography>
              <Typography variant="h6"><a href={user.email}>{user.email}</a></Typography>
            </div>
          ) : null}
          {user.website ? (
            <div>
              <Typography variant="h5">Personal Website:</Typography>
              <Typography variant="h6"><a href={user.website}>{user.website}</a></Typography>
              
            </div>
          ) : null}
          {user.location ? (
            <Typography variant="h5">
              Location: {user.location}
            </Typography>
          ) : null}
          
        </Grid>
      </Grid>
      <Grid className={classes.right} xs={8} >
        <Grid container xs={12} style={{ height: "50%" }}>
          <Typography variant="h3">
            About me
          </Typography>
          <Typography variant="h6">
            {user.bio}
          </Typography>
        </Grid>
        <Grid
          container
          xs={12}
          alignItems="center"
          justify="space-between"
          style={{ height: "50%" }}
        >
          <Grid
            item
            className={classes.preview}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://www.artbyalysia.com/uploads/6/1/6/5/61653353/27023428-1705695196158558-2154114196634259748-o_orig.jpg"
            />
          </Grid>
          <Grid
            container
            className={classes.preview}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1672&q=80"
            />
          </Grid>
          <Grid
            container
            className={classes.preview}
          >
            <img
              height="100%"
              width="100%"
              alt="sample"
              src="https://images.unsplash.com/photo-1581016327131-6cf17ab1f2c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            />
          </Grid>
          <Grid
            container
            className={classes.preview}
          >
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
  );
};
export default Kohai;