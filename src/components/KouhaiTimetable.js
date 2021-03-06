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

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  firstRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
  },
  secondRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
  },
  thirdRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
  },
  header: {
    height: "260px",
    backgroundSize: "cover",
  },
  commandButton: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});

export default function KouhaiTimetable({ lessons }) {
  const [schedulerData, setSchedulerData] = useState([]);
  useEffect(() => {
    //set schedulerData
    if (lessons) {
      const temp = lessons.map((lesson) => {
        // lesson.title = lesson.kouhaiId ? "Unavailable" : "Available"
        return lesson;
      });
      setSchedulerData(temp);
    }

    //set currentDate
  }, [lessons]);

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
                <button type="submit">Book Now</button>
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
