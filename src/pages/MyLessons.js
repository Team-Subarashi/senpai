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
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { lessonState, userState, selectedDate } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useHistory } from "react-router";
import BasicDateTimePicker from "../components/DateTimePicker";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import _ from "lodash";
import PreviousLesson from "./PreviousLesson";
import "../App.css";
import Container from "@material-ui/core/Container";

const TimeTableCell = (
  props // individual cell
) => (
  <WeekView.TimeTableCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold", height: "50px" }}
  /> // the boxes in the middle of the scheduler
);
const TimeScaleLabel = (props) => {
  return (
    <WeekView.TimeScaleLabel
      {...props}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        height: "50px",
        fontSize: "1.2rem",
      }}
    />
  ); // the div that wraps the span for the time labels
};
//need to find a way to target

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
  const user = useRecoilValue(userState);
  const date = useRecoilValue(selectedDate);
  const setLesson = useSetRecoilState(lessonState);
  const [schedulerData, setSchedulerData] = useState([]);
  const [price, setPrice] = useState(0);
  const [previousLessons, setPreviousLessons] = useState([]);
  const [scheduleToggler, setScheduleToggler] = useState(false);

  useEffect(() => {
    if (user.rates) {
      setPrice(user.rates[0]);
    }
  }, [user]);

  let tempPrices = [];
  useEffect(async () => {
    await axios.get("/stripePrices").then((res) => {
      {
        return res.data.data.map((price) => {
          if (price.metadata.userId === user._id) {
            tempPrices.push(price);
          }
          setPrice([...tempPrices]);
        });
      }
    });
  }, [user]);

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

  const bookButtonHandler = async () => {
    let endtime = moment(date).add(1, "hours");
    await axios({
      method: "post",
      url: "/lessons",
      data: {
        selectedCategory: "",
        senpaiId: user._id,
        startDate: date._d,
        endDate: endtime,
        category: user.category,
        price: price[0].unit_amount,
        priceId: price[0].id,
      },
    });
    setScheduleToggler(!scheduleToggler);
  };

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
          lesson.senpaiId === user._id
            ? lesson.selectedCategory
              ? `Senpai Lesson: ${lesson.selectedCategory}`
              : `Senpai Lesson`
            : `Kohai Lesson: ${lesson.selectedCategory}`;
        lesson.userIsSenpai = lesson.senpaiId === user._id ? true : false;
        return lesson;
      });

      const filteredTemp = temp.filter((lesson) => {
        return new Date(lesson.endDate) < new Date();
      });
      const sortedTemp = filteredTemp.sort((a, b) => {
        return new Date(a.endDate) - new Date(b.endDate);
      });
      setSchedulerData(temp);
      setPreviousLessons(fetchLessonPartner(sortedTemp));
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [scheduleToggler]);

  const joinClickHandler = (appointmentData) => {
    console.log(appointmentData.price, appointmentData.priceId);
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
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                joinClickHandler(appointmentData);
              }}
            >
              Join Room
            </Button>
            <Button onClick={() => console.log(appointmentData)}>Test</Button>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    )
  );
  const checkRenderLesson = () => {
    if (previousLessons.length > 0) {
      return previousLessons.map((lesson) => {
        return <PreviousLesson key={lesson._id} lesson={lesson} />;
      });
    } else {
      return null;
    }
  };

  if (user.isSenpai === true) {
    return (
      <Container style={{ padding: "3vw" }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container>
            <Grid item xs={9}>
              <Paper elevation={24}>
                <Scheduler data={schedulerData}>
                  <ViewState defaultCurrentDate={Date.now()} />
                  <WeekView
                    startDayHour={8}
                    endDayHour={24}
                    cellDuration={60}
                    timeTableCellComponent={TimeTableCell}
                    timeScaleLabelComponent={TimeScaleLabel}
                  />
                  <Appointments />
                  <AppointmentTooltip contentComponent={Content} />
                  <Resources
                    data={resources}
                    mainResourceName={"userIsSenpai"}
                  />
                  <Toolbar />
                  <DateNavigator />
                </Scheduler>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  marginTop: "2vh",
                  marginLeft: "3vw",
                  marginRight: "3vw",
                  backgroundColor: "#424242",
                  padding: "2vh",
                  borderRadius: "2px",
                }}
              >
                <BasicDateTimePicker />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={bookButtonHandler}
                >
                  Create Lesson Slot
                </Button>
              </div>
            </Grid>
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
          </Grid>
        </MuiPickersUtilsProvider>
      </Container>
    );
  } else {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12} style={{ backgroundColor: "blue" }}>
            <Paper>
              <Scheduler data={schedulerData}>
                <ViewState defaultCurrentDate={Date.now()} />
                <WeekView
                  startDayHour={9}
                  endDayHour={24}
                  cellDuration={60}
                  timeTableCellComponent={TimeTableCell}
                  timeScaleLabelComponent={TimeScaleLabel}
                />
                <Appointments />
                <AppointmentTooltip contentComponent={Content} />
                <Resources data={resources} mainResourceName={"userIsSenpai"} />
                <Toolbar />
                <DateNavigator />
              </Scheduler>
            </Paper>
          </Grid>
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
        </Grid>
      </Container>
    );
  }
}
