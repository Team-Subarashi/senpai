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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { lessonState, userState, selectedDate } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useHistory } from "react-router";
import BasicDateTimePicker from "../components/DateTimePicker";
import MomentUtils from "@date-io/moment";
import moment from "moment";

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
  const [category, setCategory] = useState("user.category[0]");

  const changeCategory = (skill) => {
    setCategory(skill);
  };

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

  const bookButtonHandler = () => {
    // match.params.senpaiId should be senpai's id
    let endtime = moment(date).add(1, "hours");
    axios({
      method: "post",
      url: "/lessons",
      data: {
        senpaiId: user._id,
        startDate: date._d,
        endDate: endtime,
        category: category,
        price: user.rates[user.category.indexOf(category)],
        priceId: "price_1Jg1LrEp77X0l0jdvmgYUpwP", //temp until we have a create your own rate page
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/users/${user._id}/lessons`);
      if (response.data) {
        // console.log(response.data)
        const temp = response.data.map((lesson) => {
          lesson.title =
            lesson.senpaiId === user._id ? "Senpai Lesson" : "Kohai Lesson";
          lesson.userIsSenpai = lesson.senpaiId === user._id ? true : false;
          return lesson;
        });
        setSchedulerData(temp);
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
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => joinClickHandler(appointmentData)}
            >
              Join Room
            </Button>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    )
  );

  if (user.isSenpai === true) {
    return (
      <>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container>
            <Grid item xs={9}>
              <Paper>
                <Scheduler data={schedulerData}>
                  <ViewState defaultCurrentDate={Date.now()} />
                  <WeekView
                    startDayHour={9}
                    endDayHour={24}
                    cellDuration={60}
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
                }}
              >
                <BasicDateTimePicker />
                {user.category.length === 3 ? (
                  <FormControl style={{ marginTop: "1vh" }}>
                    <InputLabel style={{ color: "#fff" }}>Category</InputLabel>
                    <Select
                      id="category-input"
                      value={category}
                      style={{
                        color: "#fff",
                        marginBottom: "1vh",
                      }}
                      onChange={(e) => {
                        changeCategory(e.target.value);
                      }}
                    >
                      <MenuItem value={`${user.category[0]}`}>
                        {`${user.category[0]} - $${user.rates[0]}/hr`}
                      </MenuItem>
                      <MenuItem value={`${user.category[1]}`}>
                        {`${user.category[1]} - $${user.rates[1]}/hr`}
                      </MenuItem>
                      <MenuItem value={`${user.category[2]}`}>
                        {`${user.category[2]} - $${user.rates[2]}/hr`}
                      </MenuItem>
                    </Select>
                  </FormControl>
                ) : null}
                {user.category.length === 2 ? (
                  <FormControl style={{ marginTop: "1vh" }}>
                    <InputLabel style={{ color: "#fff" }}>Category</InputLabel>
                    <Select
                      id="category-input"
                      value={category}
                      style={{
                        color: "#fff",
                        marginBottom: "1vh",
                      }}
                      onChange={(e) => {
                        changeCategory(e.target.value);
                      }}
                    >
                      <MenuItem value={`${user.category[0]}`}>
                        {`${user.category[0]} - $${user.rates[0]}/hr`}
                      </MenuItem>
                      <MenuItem value={`${user.category[1]}`}>
                        {`${user.category[1]} - $${user.rates[1]}/hr`}
                      </MenuItem>
                    </Select>
                  </FormControl>
                ) : null}
                {user.category.length === 1 ? (
                  <FormControl style={{ marginTop: "1vh" }}>
                    <InputLabel style={{ color: "#fff" }}>Category</InputLabel>
                    <Select
                      id="category-input"
                      value={category}
                      style={{
                        color: "#fff",
                        marginBottom: "1vh",
                      }}
                      onChange={(e) => {
                        changeCategory(e.target.value);
                      }}
                    >
                      <MenuItem value={`${user.category[0]}`}>
                        {`${user.category[0]} - $${user.rates[0]}/hr`}
                      </MenuItem>
                    </Select>
                  </FormControl>
                ) : null}

                <Button
                  color="primary"
                  variant="contained"
                  onClick={bookButtonHandler}
                >
                  Create Lesson Slot
                </Button>
              </div>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </>
    );
  } else {
    return (
      <>
        <Grid container>
          <Grid item xs={12} style={{ backgroundColor: "blue" }}>
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
          </Grid>
        </Grid>
      </>
    );
  }
}
