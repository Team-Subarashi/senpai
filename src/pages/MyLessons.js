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
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { lessonState, userState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useHistory } from "react-router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import PreviousLesson from "./PreviousLesson";

const styles = (theme) => ({
  textCenter: {
    textAlign: "center",
  },
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "flex-end",
  },
});

export default function MyLessons() {
  const [previousLessons, setPreviousLessons] = useState([]);
  const user = useRecoilValue(userState);
  const [schedulerData, setSchedulerData] = useState([]);
  const setLesson = useSetRecoilState(lessonState);
  const resources = [
    {
      fieldName: "userIsSenpai",
      title: "userIsSenpai",
      instances: [
        { id: true, text: "Senpai", color: "#5c6bc0" },
        { id: false, text: "Kohai", color: "#26a69a" },
      ],
    },
  ];
  const history = useHistory();

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
        if (lesson.kouhaiId) {
          if (lesson.userIsSenpai) {
            const response = await axios.get(`/user/${lesson.kouhaiId}`);
            const lessonPartnerObj = {
              name: response.data.name,
              avatar: response.data.avatar,
              endDate: lesson.endDate,
            };
            const combinedObject = _.assignIn(lesson, lessonPartnerObj);
            return combinedObject;
          } else {
            const response = await axios.get(`/user/${lesson.senpaiId}`);
            const lessonPartnerObj = {
              name: response.data.name,
              avatar: response.data.avatar,
              endDate: lesson.endDate,
            };
            const combinedObject = _.assignIn(lesson, lessonPartnerObj);
            return combinedObject;
          }
        } else {
          return;
        }
      });
      Promise.all(resultLessons).then((data) => {
        const result = data.filter((lesson) => {
          return lesson && lesson.kouhaiId;
        });
        setPreviousLessons(result);
      });
    };

    const fetchData = async () => {
      const response = await axios.get(`/api/v1/users/${user._id}/lessons`);
      if (response.data) {
        let temp = response.data.map((lesson) => {
          lesson.title =
            lesson.senpaiId === user._id ? "Senpai Lesson" : "Kohai Lesson";
          lesson.userIsSenpai = lesson.senpaiId === user._id ? true : false;
          return lesson;
        });

        const filteredTemp = temp.filter((lesson) => {
          return new Date(lesson.endDate) > new Date();
        });
        const sortedTemp = filteredTemp.sort((a, b) => {
          return new Date(a.endDate) - new Date(b.endDate);
        });
        setSchedulerData(temp);
        setPreviousLessons(fetchLessonPartner(sortedTemp));
      }
    };
    if (user._id) {
      fetchData();
    }
  }, [user]);

  const joinClickHandler = (appointmentData) => {
    setLesson(appointmentData);
    history.push(`/room/${appointmentData._id}`);
  };

  const Content = withStyles(styles, { name: "Content" })(
    ({ appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.textCenter}></Grid>
          <Grid item xs={10}>
            <Button onClick={() => joinClickHandler(appointmentData)}>
              Join Room
            </Button>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    )
  );
  const checkRenderLesson = () => {
    if (previousLessons.length > 0) {
      return previousLessons.map((lesson) => {
        console.log(lesson);
        return <PreviousLesson key={lesson._id} lesson={lesson} />;
      });
    } else {
      return null;
    }
  };

  return (
    <>
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState defaultCurrentDate={Date.now()} />
          <WeekView startDayHour={9} endDayHour={24} cellDuration={60} />
          <Appointments />
          <AppointmentTooltip contentComponent={Content} />
          <Resources data={resources} mainResourceName={"userIsSenpai"} />
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
          {checkRenderLesson()}
        </Paper>
      </Grid>
    </>
  );
}
