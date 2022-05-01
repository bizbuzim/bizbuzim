import { useContext } from "react";
import styled from "styled-components";

import { ExpensesContext } from "../../context/expenses";

import Table from "./table";

const Container = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 30rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
`;

const Expenses = () => {
  const { isLoading, error, expenses } = useContext(ExpensesContext);
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error {error}</div>;
  }
  return (
    <Container>
      <Table headers={["No.", "Name", "Price", "Labels"]} rows={expenses} />
    </Container>
  );
};

export default Expenses;
