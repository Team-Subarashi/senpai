import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "./Calendar";
import { Grid, Box, Button } from "@material-ui/core";
import { Tabs, Tab } from "@mui/material";
// import { TabContext, TabPanel } from "@mui/lab";
import { useRecoilState, useRecoilValue } from "recoil";
import { category as categoryAtom } from "../atoms";
import axios from "axios";

export default function SenpaiList() {
  const [senpaiList, setSenpaiList] = useState([]);
  const category = useRecoilValue(categoryAtom);

  const [tabValue, setTabValue] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const temp = [];
  const senpaiSetter = async () => {
    await axios.get("/users").then((res) => {
      for (const senpai of res.data) {
        if (category.toLowerCase() === "all") {
          temp.push({
            name: senpai.name,
            category: senpai.category,
            rates: senpai.rates,
            bio: senpai.bio,
          });
        } else if (senpai.category.includes(category)) {
          temp.push({
            name: senpai.name,
            category: senpai.category,
            rates: senpai.rates,
            bio: senpai.bio,
          });
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
            marginBottom: "3vh",
            height: "25vh",
          }}
        >
          <Grid
            item
            xs={4}
            style={{ height: "90%", backgroundColor: "lightgreen" }}
          >
            <Link to={"/profile"}>
              {senpai.name}
              <Box mt={2}>
                <img
                  height="125px"
                  width="125px"
                  src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
                />
              </Box>
              <Link></Link>
            </Link>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              fontWeight: "bold",
              paddingTop: "12vh",
              height: "90%",
              backgroundColor: "aqua",
            }}
          >
            <div>
              {senpai.category.map((skill) => {
                return <div>{skill}</div>;
              })}
            </div>

            {senpai.rates}
          </Grid>
          <Grid
            item
            xs={4}
            style={{ height: "90%", backgroundColor: "lightyellow" }}
          >
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Bio" />
              <Tab label="Calendar" />
              <Tab label="Sample" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              {senpai.bio}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Calendar />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <img
                height="50px"
                width="50px"
                src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
              />
            </TabPanel>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              style={{
                marginTop: "1vh",
                backgroundColor: "purple",
                color: "white",
              }}
              onClick={() => {
                senpaiSetter();
                console.log("booked");
              }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      );
    });
  };

  const TabPanel = (props) => {
    const { children, tabValue, index } = props;
    return <div>{children}</div>;
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
      {senpaiList.length > 0 ? senpaiPopulator() : <div>No Senpai Found</div>}
    </>
  );
}
