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

const style = () => ({
  textCenter: {
    textAlign: "center",
  },
});

export default function Timetable({ senpaiLessons }) {
  const [schedulerData, setSchedulerData] = useState([]);
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
                <Button variant="contained" color="primary" type="submit">
                  Book Now
                </Button>
              </form>
            ) : null}
            {/* <Button onClick={() => console.log(appointmentData)}>Test</Button> */}
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
