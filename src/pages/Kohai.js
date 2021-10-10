import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import axios from "axios";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms";

const Kohai = ({ match }) => {
  const [state, setState] = useState([]);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/kouhai/${match.params.id}/lessons`);
      setState(response.data);
    };
    fetchData();
  }, []);

  return (
    <Grid container xs={12}>
      <Grid
        container
        justify="flex-end"
        style={{
          textAlign: "right",
          marginTop: "0.8vh",
          marginBottom: "-6vh",
          marginRight: "5.5vw",
        }}
      >
        <Link to={{ pathname: `/edit/${user._id}` }}>
          <Button style={{ backgroundColor: "#673AB7" }}>Edit Profile</Button>
        </Link>
      </Grid>
      {/* <Box
        style={{
          marginLeft: "80.75vw",
          marginBottom: "-5vh",
          marginTop: "1vh",
        }}
      >
        <Button style={{ backgroundColor: "lightblue" }}>Edit Profile</Button>
      </Box> */}
      <Grid
        container
        className="main"
        xs={12}
        justify="space-between"
        style={{
          height: "100vh",
          padding: "50px",
          backgroundColor: "#616161",
        }}
      >
        <Grid
          item
          className="left"
          xs={3}
          style={{
            height: "85vh",
            backgroundColor: "#424242",
            borderRadius: "4px",
            padding: "30px",
          }}
        >
          <Typography
            style={{ fontFamily: "Nunito", fontSize: "25px", color: "white" }}
          >
            {user.name}
          </Typography>
          <Grid
            container
            className="avatar-holder"
            alignItems="center"
            justify="center"
            style={{
              height: "25vh",
              padding: "10px",
            }}
          >
            <Grid item>
              <Avatar
                className="kohai-photo"
                alt="kohai"
                src={user.avatar}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
          </Grid>
          <Grid item class="detail" style={{ marginLeft: "10px" }}>
            {user.twitter || user.linkedIn || user.facebook ? (
              <Typography
                style={{
                  fontFamily: "Nunito",
                  textAlign: "left",
                  fontSize: "20px",
                }}
              >
                Socials:
                <div>
                  {user.twitter ? (
                    <a
                      target="_blank"
                      href={`https://${user.twitter}`}
                      rel="noopener"
                    >
                      <Button>
                        <TwitterIcon />
                      </Button>
                    </a>
                  ) : null}
                  {user.linkedIn ? (
                    <a
                      target="_blank"
                      href={`https://${user.linkedIn}`}
                      rel="noopener"
                    >
                      <Button>
                        <LinkedInIcon />
                      </Button>
                    </a>
                  ) : null}
                  {user.facebook ? (
                    <a
                      target="_blank"
                      href={`https://${user.facebook}`}
                      rel="noopener"
                    >
                      <Button>
                        <FacebookIcon />
                      </Button>
                    </a>
                  ) : null}
                  {user.instagram ? (
                    <a
                      target="_blank"
                      href={`https://${user.instagram}`}
                      rel="noopener"
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
              <Typography
                style={{
                  fontFamily: "Nunito",

                  textAlign: "left",
                  fontSize: "20px",
                }}
              >
                <div>Email:</div>
                <p>{user.email}</p>
                {/* <a href={user.email}>{user.email}</a> */}
              </Typography>
            ) : null}
            {user.location ? (
              <Typography
                style={{
                  fontFamily: "Nunito",
                  textAlign: "left",
                  fontSize: "20px",
                }}
              >
                Location: {user.location}
              </Typography>
            ) : null}
            {user.website ? (
              <Typography
                style={{
                  fontFamily: "Nunito",

                  textAlign: "left",
                  fontSize: "20px",
                }}
              >
                <div>Website:</div>
                <a
                  target="_blank"
                  href={`https://${user.website}`}
                  rel="noopener"
                >
                  <a>{user.website}</a>
                </a>
              </Typography>
            ) : null}
          </Grid>
        </Grid>
        <Grid
          container
          className="right"
          xs={8}
          style={{
            height: "85vh",
            backgroundColor: "#424242",
            borderRadius: "4px",
            padding: "2%",
          }}
        >
          <Grid
            container
            xs={12}
            style={{ height: "30vh", marginTop: "-3vh", marginBottom: "2vh" }}
          >
            <Grid item xs={12} style={{ paddingTop: "2%" }}>
              <Typography style={{ fontFamily: "Nunito", fontSize: "26px" }}>
                About me
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                overflowWrap: "break-word",
                textAlign: "left",
                // backgroundColor: "blue",
                height: "25vh",
              }}
            >
              <Typography style={{ fontFamily: "Nunito", fontSize: "20px" }}>
                {user.bio}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            alignItems="center"
            justify="space-between"
            style={{ height: "53vh" }}
          >
            <Grid
              item
              style={{
                overflow: "hidden",
                borderRadius: "4px",
                width: "48%",
                height: "45%",
              }}
            >
              <img
                height="100%"
                width="100%"
                alt="sample"
                src="https://www.artbyalysia.com/uploads/6/1/6/5/61653353/27023428-1705695196158558-2154114196634259748-o_orig.jpg"
              />
            </Grid>
            <Grid
              item
              style={{
                overflow: "hidden",
                borderRadius: "4px",
                width: "48%",
                height: "45%",
              }}
            >
              <img
                height="100%"
                width="100%"
                alt="sample"
                src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1672&q=80"
              />
            </Grid>
            <Grid
              item
              style={{
                overflow: "hidden",
                borderRadius: "4px",
                width: "48%",
                height: "45%",
              }}
            >
              <img
                height="100%"
                width="100%"
                alt="sample"
                src="https://images.unsplash.com/photo-1581016327131-6cf17ab1f2c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />
            </Grid>
            <Grid
              item
              style={{
                overflow: "hidden",
                borderRadius: "4px",
                width: "48%",
                height: "45%",
              }}
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
    </Grid>
  );
};
export default Kohai;
