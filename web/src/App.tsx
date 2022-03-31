import "./App.css";
import styled from "styled-components";
import { ExpensesTable } from "./components/expenses-table";
import { Home } from "./views/home";
import { Routes, Route } from "react-router-dom";

const Container = styled.div``;

function App() {
  return (
    <Container className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expenses" element={<ExpensesTable />} />
      </Routes>
    </Container>
  );
}

export default App;
