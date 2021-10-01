import React, { Fragment, useState } from "react";
import { Calendar, DateTimePicker } from "@material-ui/pickers";
import { TimePickerView } from '@material-ui/pickers'
import { selectedDate } from "../Atoms";
import { useRecoilState } from "recoil";


function BasicDateTimePicker() {
  const [date, setDate] = useRecoilState(selectedDate);

  return (
    <Fragment>
      {/* <DateTimePicker
        label="DateTimePicker"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
      /> */}

      <DateTimePicker
        disablePast
        ampm={true}
        value={date}
        onChange={setDate}
        label="24h clock"
        minutesStep={60}
      />


      {/* <TimePickerView
        type="moment"
      /> */}
      
{/* 
      <DateTimePicker
        value={selectedDate}
        disablePast
        onChange={handleDateChange}
        label="With Today Button"
        showTodayButton
      /> */}
    </Fragment>
  );
}

export default BasicDateTimePicker;