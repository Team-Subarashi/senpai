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
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { Redirect } from 'react-router-dom';
import { userState } from '../atoms';
import { useRecoilValue } from 'recoil';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
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
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

export default function MyLessons({match}) {
  const user = useRecoilValue(userState)
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [schedulerData , setSchedulerData] = useState([])
  const [mainResourceName, setMainResourceName] = useState('members')
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/users/${user._id}/lessons`)
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

  const ResourceSwitcher = withStyles(styles, { name: 'ResourceSwitcher' })(
    ({
      mainResourceName, onChange, classes, resources,
    }) => (
      <div className={classes.container}>
        <div className={classes.text}>
          Main resource name:
        </div>
        <Select
          value={mainResourceName}
          onChange={e => onChange(e.target.value)}
        >
          {resources.map(resource => (
            <MenuItem key={resource.fieldName} value={resource.fieldName}>
              {resource.title}
            </MenuItem>
          ))}
        </Select>
      </div>
    ),
  );

  const Content = withStyles(styles, { name: 'Content' })(({
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

  function changeMainResource(mainResourceName) {
    setMainResourceName(mainResourceName);
  }

  return (
    <>
      <ResourceSwitcher 
        resources={resources}
        mainResourceName={mainResourceName}
        onChange={changeMainResource}
      />
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
          <Resources 
            data={resources}
            mainResourceName={mainResourceName}
          />
          <Toolbar />
          <DateNavigator />
        </Scheduler>
      </Paper>
    </>
  )
}

