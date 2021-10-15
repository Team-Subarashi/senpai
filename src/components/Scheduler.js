import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

const style = () => ({
  textCenter: {
    textAlign: "center",
  },
});

export default function Timetable({ senpaiLessons }) {
  const [schedulerData, setSchedulerData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    //set schedulerData
    if (senpaiLessons) {
      const temp = senpaiLessons.map((lesson) => {
        lesson.title = lesson.kouhaiId ? "Unavailable" : "Available";
        return lesson;
      });
      setSchedulerData(temp);
    }

    //set currentDate
  }, [senpaiLessons]);

  const changeCategory = (skill) => {
    setCategory(skill);
  };

  const Content = withStyles(style, { name: "Content" })(
    ({ appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.textCenter}></Grid>
          <Grid item xs={10}>
            {appointmentData.title === "Available" ? (
              <form
                name="checkoutForm"
                action={`/create-checkout-session/${appointmentData.priceId}/${appointmentData.senpaiId}?lesson_id=${appointmentData._id}`}
                method="POST"
              >
                <FormControl style={{ marginTop: "0.5vh", marginRight: "1vw" }}>
                  <InputLabel style={{ color: "#fff", marginTop: "-1vh" }}>
                    Category
                  </InputLabel>
                  <Select
                    id="category-input"
                    value={category}
                    style={{
                      color: "#fff",
                      marginBottom: "1vh",
                      width: "7vw",
                    }}
                    onChange={(e) => {
                      changeCategory(e.target.value);
                    }}
                  >
                    <MenuItem value={`${appointmentData.category[0]}`}>
                      {appointmentData.category[0]}
                    </MenuItem>
                    <MenuItem value={`${appointmentData.category[1]}`}>
                      {appointmentData.category[1]}
                    </MenuItem>
                    <MenuItem value={`${appointmentData.category[2]}`}>
                      {appointmentData.category[2]}
                    </MenuItem>
                  </Select>
                </FormControl>

                <Button variant="contained" color="primary" type="submit">
                  Book Now
                </Button>
                {/* <Button onClick={() => console.log(appointmentData.category)}>
                  Category Test
                </Button> */}
              </form>
            ) : null}
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    )
  );

  return (
    <Paper>
      <Scheduler data={schedulerData}>
        <ViewState defaultCurrentDate={Date.now()} />
        <WeekView startDayHour={9} endDayHour={24} cellDuration={60} />
        <Appointments />
        <AppointmentTooltip contentComponent={Content} />
        <Toolbar />
        <DateNavigator />
      </Scheduler>
    </Paper>
  );
}
