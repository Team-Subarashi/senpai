import Button from '@material-ui/core/Button'
import axios from 'axios'
import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';
import { selectedDate, userState } from '../atoms';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import BasicDateTimePicker from '../components/DateTimePicker';
import moment from 'moment';
import Test from '../components/Scheduler'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));




export default function ScheduleBooking({match, location}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        hour: null,
        day: null,
        month: null,
        year: null,
    });
    console.log("test")
    console.log(match.params)

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`/lessons/${match.params.id}`)
        console.log(response.data)
      }
      fetchData();
    }, [])

    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    const user = useRecoilValue(userState)
    const date = useRecoilValue(selectedDate)

    const bookButtonHandler = () => {
        console.log(user)
        console.log(date)
        console.log(date._d)
        // match.params.senpaiId should be senpai's id
        console.log(date)
        let endtime = moment(date).add(1, 'hours');
        console.log(endtime)
        axios({
          method: 'post',
          url: '/lessons',
          data: {
            senpaiId: match.params.id,
            kouhaiId: user._id,
            startTime: date._d,
            endTime: date._d,
          }
        })
    }


    return (
        <div>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div>Senpai's lessons</div>
            {}
            <Test />
            <BasicDateTimePicker />
            <div>
              <Button color="primary" variant="contained" onClick={bookButtonHandler}>Create Booking</Button>
            </div>
          </MuiPickersUtilsProvider>
        </div>
    )
}
