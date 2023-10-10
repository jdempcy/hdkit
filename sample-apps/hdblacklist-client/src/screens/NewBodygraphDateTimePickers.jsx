import * as React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTime } from "luxon";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';

export default function NewBodygraphDateTimePickers() {

  // let date = DateTime.utc(1983, 9, 26, 2, 48);

  const [dateValue, setDateValue] = React.useState(new Date());
  const [timeValue, setTimeValue] = React.useState(new Date());

  const handleDateChange = (newDateValue) => {
    setDateValue(newDateValue);
  };

  const handleTimeChange = (newTimeValue) => {
    setTimeValue(newTimeValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Birth date"
          inputFormat="MM/dd/yyyy"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField name="birthdate" id="birthdate" {...params} />}
        />
        {/* <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <TimePicker
          label="Birth time"
          value={timeValue}
          onChange={handleTimeChange}
          renderInput={(params) => <TextField name="birthtime" id="birthtime" {...params} />}
        />
    </LocalizationProvider>
  );
}