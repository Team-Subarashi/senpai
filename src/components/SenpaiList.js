import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
}));

export default function SenpaiList() {
  const classes = useStyles();
  const [senpaiList, setSenpaiList] = useState([]);
  const category = useRecoilValue(categoryAtom);

  // const { Tabs } = antd;
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const temp = [];
  const senpaiSetter = async () => {
    await axios.get("/api/v1/users").then((res) => {
      console.log(res);
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
            });
          }
        }
      }
      console.log(temp);
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
            item
            xs={4}
            className={classes.section}
          >
            <Typography variant="h4">
              {senpai.name}
            </Typography>
            <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} mt={2}>
              <img height="125px" width="125px" src={senpai.avatar} />
              <Link to={{ pathname: `/senpai/${senpai.id}`, state: { senpai } }}>
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
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            item
            xs={4}
            style={{
              fontWeight: "bold",
              paddingTop: "1.cl.2vh",
              backgroundColor: "#616162",
              border: "1px solid white",
            }}
          >
            <div>
              {senpai.category.map((skill, index) => {
                return (
                  <div key={skill}>
                    {skill} - {senpai.rates[index]}/hour
                  </div>
                );
              })}
            </div>
            {/* {senpai.skillOneRate}
            {senpai.skillTwoRate}
            {senpai.skillThreeRate} */}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              backgroundColor: "#616162",
              border: "1px solid white",
            }}
          >
            <Tabs class="my-tabs" defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Bio" key="1">
                {senpai.bio}
              </TabPane>
              <TabPane tab="Calendar" key="2">
                <Calendar />
              </TabPane>
              <TabPane tab="Sample" key="3">
                <img
                  height="50px"
                  width="50px"
                  src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
                />
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
    senpaiSetter();
  }, []);

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
