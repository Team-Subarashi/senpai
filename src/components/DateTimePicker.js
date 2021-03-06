import React, { Fragment } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { selectedDate } from "../atoms";
import { useRecoilState } from "recoil";

function BasicDateTimePicker() {
  const [date, setDate] = useRecoilState(selectedDate);

  return (
    <Fragment>
      <DateTimePicker
        disablePast
        ampm={true}
        value={date}
        onChange={setDate}
        label="Pick a time"
        minutesStep={60}
        defaultValue={Date.now()}
      />
    </Fragment>
  );
}

export default BasicDateTimePicker;
