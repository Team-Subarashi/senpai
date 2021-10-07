import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { userState } from '../atoms';
import { useRecoilValue } from 'recoil';

const styles = theme => ({
  textCenter: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
});

export default function MyLessons() {
  const user = useRecoilValue(userState)
  const [schedulerData , setSchedulerData] = useState([])
  const resources = [{
    fieldName: 'userIsSenpai',
    title: 'userIsSenpai',
    instances: [{id: true, text: "Senpai", color: "#5c6bc0"}, {id: false, text: "Kohai", color: "#26a69a"}],
  }]

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/users/${user._id}/lessons`)
      if (response.data) {
        console.log(response.data)
        const temp = response.data.map((lesson) => {
          lesson.title = lesson.senpaiId === user._id ? "Senpai Lesson" : "Kohai Lesson";
          lesson.userIsSenpai = lesson.senpaiId === user._id ? true : false;
          return lesson
        })
        setSchedulerData(temp)
      }
    }
    if (user._id) {
      fetchData()
    }

  }, [user])

  const Content = withStyles(styles, { name: 'Content' })(({
    appointmentData, classes, ...restProps
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
    <>
      <Paper>
        <Scheduler
          data={schedulerData}
        >
          <ViewState
            defaultCurrentDate={Date.now()}
          />
          <WeekView
            startDayHour={9}
            endDayHour={24}
            cellDuration={60}
          />
          <Appointments />
          <AppointmentTooltip contentComponent={Content} />
          <Resources 
            data={resources}
            mainResourceName={'userIsSenpai'}
          />
          <Toolbar />
          <DateNavigator />
        </Scheduler>
      </Paper>
    </>
  )
}

