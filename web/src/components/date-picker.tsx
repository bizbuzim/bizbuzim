import { useState } from "react";
import DateAdapter from "@mui/lab/AdapterMoment";
import Picker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export interface PickerProps {
  onDateChanged: (date: Date) => void;
  initial?: Date;
  label?: string;
}
export function DatePicker(props: PickerProps) {
  const [startDate, setStartDate] = useState(props.initial || new Date());

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Picker
        label={props.label || "Date"}
        value={startDate}
        inputFormat="DD/MM/yyyy"
        onChange={(d) => {
          if (!d) {
            return;
          }
          setStartDate(d);
          props.onDateChanged(d);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
