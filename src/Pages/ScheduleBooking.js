import Button from '@material-ui/core/Button'
import axios from 'axios'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useRecoilValue } from 'recoil';
import { selectedDate, userState } from '../Atoms';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import BasicDateTimePicker from '../components/DateTimePicker';

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
        console.log(date._d)
        // match.params.senpaiId should be senpai's id
        axios({
          method: 'post',
          url: '/lessons',
          data: {
            senpaiId: match.params.senpaiId,
            kouhaiId: user._id,
            time: date._d
          }
        })
    }


    return (
        <div>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div>Senpai's calendar</div>
            <div>Temporary selectors instead of calendar</div>
            <BasicDateTimePicker />
            <div>
              <Button color="primary" variant="contained" onClick={bookButtonHandler}>Create Booking</Button>
            </div>
          </MuiPickersUtilsProvider>
        </div>
    )
}
