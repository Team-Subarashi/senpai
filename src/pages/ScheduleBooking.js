import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { selectedDate, userState } from "../atoms";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import BasicDateTimePicker from "../components/DateTimePicker";
import moment from "moment";
import Timetable from "../components/Scheduler";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ScheduleBooking({ match, location }) {
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

  const date = useRecoilValue(selectedDate);

  const bookButtonHandler = () => {
    // match.params.senpaiId should be senpai's id
    let endtime = moment(date).add(1, "hours");
    axios({
      method: "post",
      url: "/lessons",
      data: {
        senpaiId: match.params.id,
        startDate: date._d,
        endDate: endtime,
        priceId: "price_1Jg1LrEp77X0l0jdvmgYUpwP", //temp until we have a create your own rate page
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/senpai/${match.params.id}/lessons`);
      setState(response.data);
    };
    fetchData();
  }, []);

  const date = useRecoilValue(selectedDate);

  const bookButtonHandler = () => {
    // match.params.senpaiId should be senpai's id
    let endtime = moment(date).add(1, "hours");
    axios({
      method: "post",
      url: "/lessons",
      data: {
        senpaiId: match.params.id,
        startDate: date._d,
        endDate: endtime,
        priceId: "price_1Jg1LrEp77X0l0jdvmgYUpwP", //temp until we have a create your own rate page
      },
    });
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>Senpai's lessons</div>
        <Grid container>
          <Grid item xs={8}>
            <Timetable senpaiLessons={state} match={match} />
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
