import React, { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Calendar from "../components/Calendar";
import { Grid, Box, Button } from "@material-ui/core";

import axios from "axios";

export default function Search() {
  const [senpaiList, setSenpaiList] = useState([]);
  const [category, setCategory] = useState("Pottery");

  const temp = [];
  const senpaiSetter = async () => {
    await axios.get("/users").then((res) => {
      for (const senpai of res.data) {
        if (senpai.category.includes(category)) {
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
            {`${senpai.name} - ${senpai.bio}`}
            <Box mt={2}>
              <img
                height="125px"
                width="125px"
                src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              fontWeight: "bold",
              paddingTop: "19vh",
              height: "90%",
              backgroundColor: "aqua",
            }}
          >
            {senpai.rates}
          </Grid>
          <Grid
            item
            xs={4}
            style={{ height: "90%", backgroundColor: "lightyellow" }}
          >
            <Calendar senpaiName={senpai.name} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{
                marginTop: "1vh",
                marginLeft: "85%",
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

  useEffect(() => {
    senpaiSetter();
  }, []);

  useEffect(() => {
    senpaiPopulator();
  }, [senpaiList]);

  return (
    <Grid container style={{}}>
      <Grid
        item
        xs={12}
        style={{
          height: "5vh",
          //   backgroundColor: "red"
        }}
      >
        <Filter />
      </Grid>
      {/* <Grid item xs={2}></Grid> */}

      <Grid
        id="senpai-list"
        item
        xs={10}
        style={{
          marginLeft: "8.5vw",
          marginTop: "3vh",
          height: "80vh",
          backgroundColor: "lightblue",
          overflow: "scroll",
        }}
      >
        {senpaiList.length > 0 ? (
          senpaiPopulator()
        ) : (
          <Grid container id="single-senpai" style={{ height: "25vh" }}>
            <Grid
              item
              xs={4}
              style={{ height: "90%", backgroundColor: "lightgreen" }}
            >
              Bio/Pic Component
            </Grid>
            <Grid
              item
              xs={4}
              style={{ height: "90%", backgroundColor: "darkblue" }}
            >
              Rates, etc.
            </Grid>
            <Grid
              item
              xs={4}
              style={{ height: "90%", backgroundColor: "lightyellow" }}
            >
              <Calendar />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{
                  marginTop: "1vh",
                  marginLeft: "85%",
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
        )}
      </Grid>
      {/* <Grid item xs={2}></Grid> */}
    </Grid>
  );
}
