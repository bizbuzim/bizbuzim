import "./App.css";
import styled from "styled-components";
import { ExpensesTable } from "./components/expenses-table";

const Container = styled.div``;

function App() {
  return (
    <Container className="app">
      <ExpensesTable />
    </Container>
  );
}

export default App;
