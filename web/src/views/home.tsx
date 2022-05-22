import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { DateTime } from "luxon";

import { ExpensesContext } from "../context/expenses";
import { ExpensesBarChart } from "../components/charts/bar";
import { FiltersContext } from "../context/filters";

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

const Values = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const ValueContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(44, 51, 88);
  color: rgb(204, 204, 220);
  min-height: 10vh;
  width: 10vh;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ValueHeader = styled.div``;
const ValueContent = styled.div``;

export const Home: React.FC = () => {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const {
    dates: { to },
  } = useContext(FiltersContext);
  const [stackedChart, setStackedChart] = useState(false);
  const total = useMemo(() => {
    return expenses.reduce((p, c) => _.toNumber(c.price) + p, 0);
  }, [expenses]);
  const days = useMemo(() => {
    if (!to) {
      return 0;
    }
    const now = DateTime.local();
    return Math.ceil(to.diff(now).as("days"));
  }, [to]);
  if (isLoading) {
    return <></>;
  }

  return (
    <Container>
      <Values>
        <ValueContainer>
          <ValueHeader>Total</ValueHeader>
          <ValueContent>{_.toNumber(total).toFixed(1)}</ValueContent>
        </ValueContainer>
        <ValueContainer>
          <ValueHeader>Days Left</ValueHeader>
          <ValueContent>{days}</ValueContent>
        </ValueContainer>
      </Values>
      <button
        onClick={() => {
          setStackedChart(!stackedChart);
        }}
      >
        Stack
      </button>
      <ExpensesBarChart stacked={stackedChart} />
    </Container>
  );
};
