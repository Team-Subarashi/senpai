import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRecoilValue } from "recoil";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { category as categoryAtom, allReviewsState } from "../atoms";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Rating } from "@material-ui/lab";


const useStyles = makeStyles(() => ({
  section: {
    backgroundColor: "#616162",
    border: "1px #2c303a",
    padding: "1rem",
  },
  container: {
    backgroundColor: "#424242",
    // margin: "1rem",
  },
  avatarHolder: {
    alignItems: "center",
    justifyContent: "center",
    height: "25vh",
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
  const allReviews = useRecoilValue(allReviewsState);

  useEffect(() => {
    for (const senpai of senpaiList) {
      if (senpai.video !== "") {
        console.log(senpai);
      }
    }
  }, [senpaiList]);
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const temp = [];
  const senpaiSetter = async () => {
    await axios.get("/api/v1/users").then((res) => {
      for (const senpai of res.data) {
        if (senpai.isSenpai === true) {
          let ratings = allReviews.filter((review) => {
            return review.senpaiId === senpai._id;
          });
          let avgRating = ratings.length > 0 ? ratings.reduce((prevVal, currentVal) => prevVal.rating + currentVal.rating) / ratings.length : 0;
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
              avgRating: avgRating,
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
              avgRating: avgRating,
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
            marginTop: "2rem",
            fontFamily: "Roboto",
          }}
          key={senpai._id}
        >
          {/* Left side of senpai */}
          <Grid
            container
            justifyContent="space-between"
            xs={4}
            className={classes.section}
            style={{
              backgroundColor: "#5a5f72",
              marginRight: "-1vw",
              marginLeft: "23%",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            }}
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
                <Avatar
                  className="senpai-photo"
                  alt="senpai"
                  src={senpai.avatar}
                  style={{ width: 100, height: 100 }}
                />
                <Rating
                  value={senpai.avgRating}
                  name="rating"
                  readOnly="true"
                  precision={0.5}
                  style={{marginTop: "0.5rem"}}
                />
                <Link
                  to={{ pathname: `/senpai/${senpai.id}`, state: { senpai } }}
                >
                  <Button
                    variant="contained"
                    style={{
                      marginTop: "0.5rem",
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
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{
                  color: "#2ac3de",
                  textAlign: "center",
                  fontFamily: "Roboto",
                }}
              >
                {senpai.name}
              </Typography>
              <h3
                style={{
                  color: "#9ece6a",
                  borderBottom: "1px",
                }}
              >{`¥${senpai.rates[0]}/hr`}</h3>
              <Grid
                container
                direction="column"
                style={{
                  paddingRight: "1vw",
                  paddingLeft: "1vw",
                  alignContent: "center",
                }}
              >
                {senpai.category.map((skill) => {
                  if (skill.length > 1) {
                    return (
                      <Button
                        key={skill}
                        style={{
                          marginTop: "1vh",
                          width: "50%",
                          backgroundColor: "#2ac3de",
                          color: "black",
                        }}
                      >
                        {skill}
                      </Button>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          {/* Right side of senpai */}
          <Grid
            item
            xs={3}
            style={{
              backgroundColor: "#414868",
              border: "1px #2c303a",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            <Tabs class="my-tabs" defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Bio" key="1">
                <div>
                  {senpai.bio}
                </div>
              </TabPane>
              <TabPane tab="Intro" key="2">
                <div className={classes.videoDiv}>
                  {senpai.video !== "" ? (
                    // <p>{`{senpai.video.split("?v=")[1]}`}</p>
                    <iframe
                      src={
                        "https://www.youtube.com/embed/" +
                        senpai.video.split("?v=")[1]
                      }
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
              </TabPane>
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
