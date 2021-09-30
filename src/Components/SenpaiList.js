import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import { Grid, Box, Button } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { category as categoryAtom } from "../atoms";
import axios from "axios";

export default function SenpaiList() {
  const [senpaiList, setSenpaiList] = useState([]);
  const category = useRecoilValue(categoryAtom);

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
            {`${senpai.name} - ${senpai.bio}`}
            <Box mt={2}>
              <img
                height="125px"
                width="125px"
                src="https://www.pngfind.com/pngs/m/2-24642_imagenes-random-png-cosas-random-png-transparent-png.png"
              />
            </Box>
            <div>
              {senpai.category.map((skill) => {
                return <div>{skill}</div>;
              })}
            </div>
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
            Rates
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
    </>
  );
}
