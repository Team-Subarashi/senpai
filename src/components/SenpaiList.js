import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRecoilValue } from "recoil";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { category as categoryAtom } from "../atoms";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  section: {
    backgroundColor: "#616162",
    border: "1px solid white",
    padding: "1rem",
  },
  container: {
    backgroundColor: "#424242",
    // margin: "1rem",
  },
  videoIframe: {
    // position: "absolute",
    // top: 0,
    // left: "30%",
    // width: "75%",
    // height: "100%",
  },
  videoDiv: {
    // position: "relative",
    // width: "75%",
    // height: "75%",
    // paddingBottom: "25vh",
  },
}));

export default function SenpaiList() {
  const classes = useStyles();
  const [senpaiList, setSenpaiList] = useState([]);
  const category = useRecoilValue(categoryAtom);

  useEffect(() => {
    for (const senpai of senpaiList) {
      if (senpai.video !== "") {
        console.log(senpai);
      }
    }
  }, [senpaiList]);
  // const { Tabs } = antd;
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const temp = [];
  const senpaiSetter = async () => {
    await axios.get("/api/v1/users").then((res) => {
      for (const senpai of res.data) {
        if (senpai.isSenpai === true) {
          if (category.toLowerCase() === "all") {
            temp.push({
              id: senpai._id,
              avatar: senpai.avatar,
              name: senpai.name,
              category: senpai.category,
              rates: senpai.rates,
              bio: senpai.bio,
              email: senpai.email,
              location: senpai.location,
              twitter: senpai.twitter,
              facebook: senpai.facebook,
              linkedIn: senpai.linkedIn,
              website: senpai.website,
              video: senpai.introVideo,
            });
          } else if (senpai.category.includes(category)) {
            temp.push({
              id: senpai._id,
              avatar: senpai.avatar,
              name: senpai.name,
              category: senpai.category,
              rates: senpai.rates,
              bio: senpai.bio,
              email: senpai.email,
              location: senpai.location,
              twitter: senpai.twitter,
              facebook: senpai.facebook,
              linkedIn: senpai.linkedIn,
              website: senpai.website,
              video: senpai.introVideo,
            });
          }
        }
      }
      setSenpaiList(temp);
    });
  };

  const senpaiPopulator = () => {
    return senpaiList.map((senpai) => {
      return (
        <Grid
          container
          id="single-senpai"
          style={{
            padding: "2rem",
          }}
          key={senpai._id}
        >
          <Grid
            container
            justifyContent="space-between"
            xs={8}
            className={classes.section}
            style={{ backgroundColor: "#f3f0e9" }}
          >
            <Grid item xs={6}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                mt={2}
              >
                <img height="125px" width="125px" src={senpai.avatar} />
                <Link
                  to={{ pathname: `/senpai/${senpai.id}`, state: { senpai } }}
                >
                  <Button
                    variant="contained"
                    style={{
                      marginTop: "1vh",
                      backgroundColor: "purple",
                      color: "white",
                    }}
                    onClick={() => {
                      senpaiSetter();
                    }}
                  >
                    Go to Profile
                  </Button>
                </Link>
              </Box>
            </Grid>
            {/* </Grid> */}
            {/* <Grid
            container
            // alignItems="center"
            justifyContent="center"
            item
            xs={4}
            style={{
              fontWeight: "bold",
              paddingTop: "1.cl.2vh",
              backgroundColor: "#616162",
              border: "1px solid white",
            }}
          > */}
            {/* <Grid item xs={12}> */}
            <Grid item xs={6}>
              <Typography variant="h2" style={{ color: "black" }}>
                {senpai.name}
              </Typography>
              <h2
                style={{
                  // backgroundColor: "white",
                  // width: "25vw",
                  borderBottom: "1px",
                }}
              >{`Hourly Rate: ¥${senpai.rates[0]}`}</h2>
              {senpai.category.map((skill) => {
                return (
                  <li
                    key={skill}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "left",
                      fontSize: "large",
                    }}
                  >
                    {skill}
                  </li>
                );
              })}
            </Grid>
            {/* </Grid> */}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              backgroundColor: "#673ab7",
              border: "1px solid white",
            }}
          >
            <Tabs class="my-tabs" defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Bio" key="1">
                {senpai.bio}
              </TabPane>
              <TabPane tab="Intro" key="2">
                {/* <Container
                  fixed
                  className={classes.container}
                  style={{ padding: "1rem" }}
                >
                  <div className={classes.videoDiv}>
                    {senpai.video !== "" ? (
                      // <p>{senpai.video.split("?v=")[1]}</p>
                      <iframe
                        src={`https://www.youtube.com/embed/
                    ${senpai.video.split("?v=")[1]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={classes.videoIframe}
                      ></iframe>
                    ) : (
                      <p>This user does not have a video uploaded</p>
                    )}
                  </div>
                </Container> */}
              </TabPane>
              {/* <TabPane tab="Sample" key="3">
                <img
                  height="50px"
                  width="50px"
                  src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
                />
              </TabPane> */}
            </Tabs>
          </Grid>
        </Grid>
      );
    });
  };

  useEffect(() => {
    senpaiSetter();
  }, [category]);

  useEffect(() => {
    senpaiPopulator();
  }, [senpaiList]);

  return (
    <>
      {senpaiList.length > 0 ? (
        senpaiPopulator()
      ) : (
        <div>We couldn't find any senpai that fit these filters!</div>
      )}
    </>
  );
}
