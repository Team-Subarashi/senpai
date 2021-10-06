import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Avatar, Typography } from "@mui/material";
import axios from "axios";

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
    <Grid
      className="main"
      container
      xs={12}
      justify="space-between"
      style={{
        height: "100vh",
        padding: "50px",
        backgroundColor: "#616161",
      }}
    >
      <Grid
        className="left"
        item
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
          className="avatar-holder"
          container
          alignItems="center"
          justify="center"
          style={{
            height: "25vh",
            padding: "10px",
          }}
        >
          <Grid>
            <Avatar
              className="kohai-photo"
              alt="kohai"
              src={user.avatar}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
        </Grid>
        <Grid class="detail" style={{ marginLeft: "10px" }}>
          {user.email ? (
            <Typography
              style={{
                fontFamily: "Nunito",

                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <div>Email:</div>
              <a href={user.email}>{user.email}</a>
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
              <div>Personal Website:</div>
              <a href={user.website}>{user.website}</a>
            </Typography>
          ) : null}
          {user.twitter || user.linkedIn || user.facebook ? (
            <Typography
              style={{
                fontFamily: "Nunito",
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              Socials:
            </Typography>
          ) : null}
          {user.twitter ? (
            <Typography
              style={{
                fontFamily: "Nunito",

                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <a href={user.twitter}>@{user.twitter}</a>
            </Typography>
          ) : null}
          {user.linkedIn ? (
            <Typography
              style={{
                fontFamily: "Nunito",

                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <a href={user.twitter}>LinkedIn</a>
            </Typography>
          ) : null}
          {user.facebook ? (
            <Typography
              style={{
                fontFamily: "Nunito",

                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <a href={user.facebook}>Facebook</a>
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      <Grid
        className="right"
        xs={8}
        style={{
          height: "85vh",
          backgroundColor: "#424242",
          borderRadius: "4px",
          padding: "30px",
        }}
      >
        <Grid container xs={12} style={{ height: "50%" }}>
          <Typography style={{ fontFamily: "Nunito", fontSize: "24px" }}>
            About me
          </Typography>
          <Typography style={{ fontFamily: "Nunito", fontSize: "20px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
            container
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
            container
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
            container
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
  );
};
export default Kohai;