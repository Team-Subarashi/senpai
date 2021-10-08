import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Room from "@material-ui/icons/Room";
import { Redirect } from "react-router-dom";
import { userState } from "../atoms";
import { useRecoilValue } from "recoil";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import PreviousLesson from "./PreviousLesson";

const styles = (theme) => ({
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
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "flex-end",
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

export default function MyLessons({ match }) {
  const user = useRecoilValue(userState);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [schedulerData, setSchedulerData] = useState([]);
  const [mainResourceName, setMainResourceName] = useState("members");
  const [resources, setResources] = useState([]);
  const [previousLessons, setPreviousLessons] = useState([]);
  const [currentLessons, setCurrentLessons] = useState([]);

  // please keep this to refactor
  // to use this you need to take the useEffect out from PreviousLesson file since this no longer gives promise

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(`/api/v1/users/${user._id}/lessons`);
  //     if (response.data) {
  //       const temp = response.data.map((lesson) => {
  //         lesson.title = "Active Lesson";
  //         return lesson;
  //       });
  //       setSchedulerData(temp);

  //       setCurrentLessons(temp);
  //     }
  //   };
  //   fetchData();
  // }, [user]);
  // useEffect(() => {
  //   const fetchLessonPartner = async (targetLessons) => {
  //     const requestList = targetLessons.map((lesson) => {
  //       return axios.get(`/senpai/${lesson.senpaiId}`);
  //     });

  //     Promise.all(requestList).then((response) => {
  //       const lessons = response.map((r) => r.data);
  //       setPreviousLessons(lessons);
  //     });
  //   };
  // fetchLessonPartner(currentLessons);
  // }, [currentLessons]);

  useEffect(() => {
    const fetchLessonPartner = async (targetLessons) => {
      const resultLessons = targetLessons.map(async (lesson) => {
        const response = await axios.get(`/senpai/${lesson.senpaiId}`);
        const lessonPartnerObj = {
          name: response.data.name,
          avatar: response.data.avatar,
          endDate: lesson.endDate,
        };
        const combinedObject = _.assignIn(lesson, lessonPartnerObj);
        return combinedObject;
      });
      setPreviousLessons(resultLessons);
    };

    const fetchData = async () => {
      const response = await axios.get(`/api/v1/users/${user._id}/lessons`);
      if (response.data) {
        let temp = response.data.map((lesson) => {
          lesson.title = "Active Lesson";

          return lesson;
        });

        const filteredTemp = temp.filter((lesson) => {
          return new Date(lesson.endDate) < new Date();
        });
        const sortedTemp = filteredTemp.sort((a, b) => {
          return new Date(a.endDate) - new Date(b.endDate);
        });
        setSchedulerData(temp);
        fetchLessonPartner(sortedTemp);
      }
    };
    fetchData();
  }, [user]);

  const ResourceSwitcher = withStyles(styles, { name: "ResourceSwitcher" })(
    ({ mainResourceName, onChange, classes, resources }) => (
      <div className={classes.container}>
        <div className={classes.text}>Main resource name:</div>
        <Select
          value={mainResourceName}
          onChange={(e) => onChange(e.target.value)}
        >
          {resources.map((resource) => (
            <MenuItem key={resource.fieldName} value={resource.fieldName}>
              {resource.title}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  );

  const Content = withStyles(styles, { name: "Content" })(
    ({ children, appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.textCenter}></Grid>
          <Grid item xs={10}>
            <button type="submit">Join Room</button>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    )
  );

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
        <Scheduler data={schedulerData}>
          <ViewState defaultCurrentDate={selectedDate} />
          <WeekView startDayHour={9} endDayHour={24} cellDuration={60} />
          <Appointments />
          <AppointmentTooltip contentComponent={Content} />
          <Resources data={resources} mainResourceName={mainResourceName} />
          <Toolbar />
          <DateNavigator />
        </Scheduler>
      </Paper>
      <Grid xs={12} container>
        <Paper
          style={{
            marginTop: "100px",
            marginBottom: "100px",
            maxHeight: 300,
            width: "100%",
            overflow: "auto",
          }}
        >
          {previousLessons.map((lesson) => {
            return <PreviousLesson lessonProp={lesson} />;
          })}
        </Paper>
      </Grid>
    </>
  );
}
