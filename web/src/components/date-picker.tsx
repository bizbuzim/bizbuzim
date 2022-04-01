import { useState } from "react";
import Picker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface PickerProps {
  onDateChanged: (date: Date) => void;
}
export function DatePicker(props: PickerProps) {
  const [startDate, setStartDate] = useState(new Date());
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
