import { ExpensesTable } from "./expenses-table";
import { Home } from "./../views/home";
import { Routes, Route } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="expenses" element={<ExpensesTable />} />
    </Routes>
  );
}
