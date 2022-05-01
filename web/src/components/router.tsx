import { Routes, Route } from "react-router-dom";

import Expenses from "./../views/expenses";
import { Home } from "./../views/home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="expenses" element={<Expenses />} />
    </Routes>
  );
}
