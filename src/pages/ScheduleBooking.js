import axios from "axios";
import React, { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Timetable from "../components/Scheduler";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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
      const response = await axios.get(`/api/v1/senpai/${match.params.id}/lessons`);
      setState(response.data);
    };
    fetchData();
  }, []);

  return (
    <Container style={{marginTop: "4rem", marginBottom: "4rem"}}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
        </Grid>
      </MuiPickersUtilsProvider>
    </Container>
  );
}
