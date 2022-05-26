import React, { useContext } from "react";
import styled from "styled-components";

import { ExpensesContext } from "../../context/expenses";
import { FiltersContext } from "../../context/filters";

import Table from "./table";

const Container = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
  min-height: 30rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
`;

const Expenses: React.FC = () => {
  const { isLoading, error, expenses } = useContext(ExpensesContext);
  const { tags, search, payments } = useContext(FiltersContext);
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error {error}</div>;
  }
  let filtered = expenses;
  if (tags.length > 0) {
    filtered = expenses.filter((e) => {
      return e.tags.some((t) => tags.includes(t));
    });
  }

  if (search) {
    filtered = filtered.filter((e) => e.name.includes(search));
  }

  if (payments.length > 0) {
    filtered = filtered.filter((e) => payments.includes(e.payment));
  }
  return (
    <Container>
      <Table rows={filtered} />
    </Container>
  );
};

export default Expenses;
