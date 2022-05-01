import { useContext, useMemo } from "react";
import styled from "styled-components";
import _ from "lodash";

import { ExpensesContext } from "../context/expenses";
import { ExpensesBarChart } from "../components/charts/bar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 30rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
`;

export function Home() {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const total = useMemo(() => {
    return expenses.reduce((p, c) => _.toNumber(c.price) + p, 0);
  }, [expenses]);
  if (isLoading) {
    return <></>;
  }
  return (
    <Container>
      <div>Total: {_.toNumber(total).toFixed(1)}</div>
      <ExpensesBarChart />
    </Container>
  );
}
