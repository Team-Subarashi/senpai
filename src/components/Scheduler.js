import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { Redirect } from 'react-router-dom';

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

export default function Timetable({senpaiLessons, match}) {
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [schedulerData , setSchedulerData] = useState([])
  useEffect(() => {
    //set schedulerData
    if (senpaiLessons) {
      const temp = senpaiLessons.map((lesson) => 
      {
        lesson.title = lesson.kouhaiId ? "Unavailable" : "Available"
        return lesson
      })
      setSchedulerData(temp)
    }
    
    //set currentDate
  }, [senpaiLessons])

  const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
        </Grid>
        <Grid item xs={10}>
          {appointmentData.title === "Available" ? 
            <form name="checkoutForm" action={`/create-checkout-session/${appointmentData.priceId}/${appointmentData.senpaiId}?lesson_id=${appointmentData._id}`} method="POST">
              <button type="submit">Book Now</button>
            </form>
            : null
          }
        
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));

  return (
    <Paper>
      <Scheduler
        data={schedulerData}
      >
        <ViewState
          defaultCurrentDate={selectedDate}
        />
        <WeekView
          startDayHour={9}
          endDayHour={24}
          cellDuration={60}
        />
        <Appointments />
        <AppointmentTooltip contentComponent={Content} />
        <Toolbar />
        <DateNavigator />
      </Scheduler>
    </Paper>
  )
}
