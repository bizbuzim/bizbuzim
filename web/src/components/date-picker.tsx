import React, { useState } from "react";
import Picker from "@mui/lab/DatePicker";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTime } from "luxon";

export interface PickerProps {
  onDateChanged: (date: DateTime) => void;
  initial?: DateTime;
  label?: string;
}
export const DatePicker: React.FC<PickerProps> = (props) => {
  const [startDate, setStartDate] = useState(props.initial || new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Picker
        label={props.label || "Date"}
        value={startDate}
        onChange={(d) => {
          if (!d) {
            return 0;
          }
          setStartDate(d);
          props.onDateChanged(d);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
