import axios from "axios";
import React, { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Timetable from "../components/Scheduler";
import Grid from "@material-ui/core/Grid";


export default function ScheduleBooking({ match }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/v1/users/${match.params.id}/lessons`
      );
      setState(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/senpai/${match.params.id}/lessons`);
      setState(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>Senpai's Lessons</div>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              marginLeft: "2vw",
              marginRight: "2vw",
            }}
          >
            <Timetable senpaiLessons={state} match={match} />
          </Grid>
          {/* <Grid item xs={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <h3>Temp selector until we have a create your own rates page </h3>
              <BasicDateTimePicker />
              <Button
                color="primary"
                variant="contained"
                onClick={bookButtonHandler}
              >
                Create Lesson Slot
              </Button>
            </div>
          </Grid> */}
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
}
