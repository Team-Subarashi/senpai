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
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { lessonState, userState } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router';

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
  const setLesson = useSetRecoilState(lessonState)
  const resources = [{
    fieldName: 'userIsSenpai',
    title: 'userIsSenpai',
    instances: [{id: true, text: "Senpai", color: "#5c6bc0"}, {id: false, text: "Kohai", color: "#26a69a"}],
  }]
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/users/${user._id}/lessons`)
      if (response.data) {
        // console.log(response.data)
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

  const joinClickHandler = (appointmentData) => {
    setLesson(appointmentData)
    history.push(`/room/${appointmentData._id}`)
  }

  const Content = withStyles(styles, { name: 'Content' })(({
    appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
        </Grid>
        <Grid item xs={10}>
          <Button onClick={() => joinClickHandler(appointmentData)}>
                Join Room
          </Button>
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

