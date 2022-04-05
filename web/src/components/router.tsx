import { Routes, Route } from "react-router-dom";

import { Expenses } from "./../views/expenses";
import { Home } from "./../views/home";

export interface Props {
  dateFrom: Date;
  dateTo: Date;
}
export function Router({ dateFrom, dateTo }: Props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="expenses"
        element={<Expenses fromDate={dateFrom} toDate={dateTo} />}
      />
    </Routes>
  );
}
