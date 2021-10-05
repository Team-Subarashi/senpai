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
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { Redirect } from 'react-router-dom';
import { userState } from '../atoms';
import { useRecoilValue } from 'recoil';

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

export default function MyLessons({match}) {
  const user = useRecoilValue(userState)
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [schedulerData , setSchedulerData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/users/${user._id}/lessons`)
      if (response.data) {
        console.log(response.data)
        const temp = response.data.map((lesson) => {
          lesson.title = "Active Lesson"
          return lesson
        })
        setSchedulerData(temp)
      }
    }
    fetchData()
  }, [user])

  const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
        </Grid>
        <Grid item xs={10}>
            <button type="submit">Join Room</button>
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

