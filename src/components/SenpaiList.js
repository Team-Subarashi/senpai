import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "./Calendar";
import { Grid, Box, Button } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { category as categoryAtom } from "../atoms";
import axios from "axios";

export default function SenpaiList() {
  const [senpaiList, setSenpaiList] = useState([]);
  const category = useRecoilValue(categoryAtom);

  const [toggleState, setToggleState] = useState(1);
  // const { Tabs } = antd;
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const temp = [];
  const senpaiSetter = async () => {
    await axios.get("/users").then((res) => {
      console.log(res.data);
      for (const senpai of res.data) {
        if (category.toLowerCase() === "all") {
          temp.push({
            id: senpai._id,
            name: senpai.name,
            category: senpai.category,
            rates: senpai.rates,
            bio: senpai.bio,
          });
        } else if (senpai.category.includes(category)) {
          temp.push({
            id: senpai._id,
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
    return senpaiList.map((senpai, index) => {
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
            {senpai.name}
            <Box mt={2}>
              <img
                height="125px"
                width="125px"
                src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
              />
            </Box>
            <Link></Link>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              fontWeight: "bold",
              paddingTop: "1.cl.2vh",
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
          <Grid item xs={2}>
            <Link to={`/senpais/${senpai.id}`}>
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
                Book Now
              </Button>
            </Link>
          </Grid>
        </Grid>
      );
    });
  };

  const toggleTab = (event, index) => {
    console.log(event.target.id);
    setToggleState(index);
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
