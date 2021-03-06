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

const TimeTableCell = (props) => (
  <WeekView.TimeTableCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold", height: "50px" }}
  />
);
const TimeScaleLabel = (props) => (
  <WeekView.TimeScaleLabel
    {...props}
    style={{
      textAlign: "center",
      fontWeight: "bold",
      height: "50px",
      fontSize: "1.2rem",
    }}
  />
);

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
    await axios.get("/api/v1/stripePrices").then((res) => {
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
      url: "/api/v1/lessons",
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

  const fetchLessonPartner = async (targetLessons) => {
    const resultLessons = targetLessons.map(async (lesson) => {
      if (lesson.kouhaiId) {
        if (lesson.userIsSenpai) {
          const response = await axios.get(`/api/v1/user/${lesson.kouhaiId}`);
          const lessonPartnerObj = {
            name: response.data.name,
            avatar: response.data.avatar,
            endDate: lesson.endDate,
          };
          const combinedObject = _.assignIn(lesson, lessonPartnerObj);
          return combinedObject;
        } else {
          const response = await axios.get(`/api/v1/user/${lesson.senpaiId}`);
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
              ? `${lesson.selectedCategory} Lesson`
              : `Unbooked`
            : `${lesson.selectedCategory} Lesson`;
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
      <Container style={{ padding: "2vw" }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container>
            <Grid item xs={8}>
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
            <Grid item xs={4}>
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
              <Grid xs={12} style={{ marginTop: "20px" }} item>
                <h1 style={{ color: "#9ece6a", textAlign: "left" }}>
                  Previous lesson
                </h1>
                <Paper
                  style={{
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
          </Grid>
        </MuiPickersUtilsProvider>
      </Container>
    );
  } else {
    return (
      <Container style={{ padding: "3vw" }}>
        <Grid container>
          <Grid item xs={12}>
            <Paper>
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
                <Resources data={resources} mainResourceName={"userIsSenpai"} />
                <Toolbar />
                <DateNavigator />
              </Scheduler>
            </Paper>
          </Grid>
          <Grid xs={12} container>
            <Grid xs={12} style={{ marginTop: "20px" }} item>
              <h1 style={{ color: "#9ece6a", textAlign: "left" }}>
                Previous lesson
              </h1>
              <Paper
                style={{
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
        </Grid>
      </Container>
    );
  }
}
