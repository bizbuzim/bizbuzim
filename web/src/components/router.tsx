import React from "react";
import { Routes, Route } from "react-router-dom";

import Expenses from "./../views/expenses";
import Sources from "./../views/sources";
import { Home } from "./../views/home";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="sources" element={<Sources />} />
    </Routes>
  );
};
