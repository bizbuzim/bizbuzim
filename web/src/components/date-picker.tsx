import { useState } from "react";
import Picker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface PickerProps {
  onDateChanged: (date: Date) => void;
  initial?: Date;
}
export function DatePicker(props: PickerProps) {
  const [startDate, setStartDate] = useState(props.initial || new Date());
  return (
    <Picker
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date);
        props.onDateChanged(date);
      }}
    />
  );
}
