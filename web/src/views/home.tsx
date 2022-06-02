import exp from "constants";

import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { DateTime } from "luxon";

import { ExpensesContext } from "../context/expenses";
import { ExpensesBarChart } from "../components/charts/bar";
import PaymentsPieChart from "../components/charts/pie";
import ExpensesForecastLineChart from "../components/charts/line";
import { FiltersContext, applyFilterTags } from "../context/filters";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  min-height: 30rem;
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
  align-items: flex-start;
  background-color: rgb(255, 255, 255);
  min-height: 10vh;
  width: 20vh;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ValueHeader = styled.div`
  padding-left: 10px;
  color: #999999;
`;
const ValueContent = styled.div`
  padding-left: 10px;
  font-size: x-large;
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80vh;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Home: React.FC = () => {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const {
    tags: tagsFilter,
    dates: { from, to },
  } = useContext(FiltersContext);
  const { payments, tags } = useMemo(() => {
    const payments = new Set<string>();
    const tags = new Set<string>();
    _.forEach(expenses, (e) => {
      payments.add(e.payment);
      _.forEach(e.tags, (t) => tags.add(t));
    });
    return { payments, tags };
  }, [expenses]);
  const [stackedChart, setStackedChart] = useState(false);
  const total = useMemo(() => {
    if (tagsFilter) {
      const filterdExpenses = applyFilterTags(expenses, tagsFilter);
      return filterdExpenses.reduce((p, c) => _.toNumber(c.price) + p, 0);
    }
    return expenses.reduce((p, c) => _.toNumber(c.price) + p, 0);
  }, [expenses, tagsFilter]);
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
        <ValueContainer>
          <ValueHeader>Payment Types</ValueHeader>
          <ValueContent>{_.size(payments)}</ValueContent>
        </ValueContainer>
        <ValueContainer>
          <ValueHeader>Unique Tags</ValueHeader>
          <ValueContent>{_.size(tags)}</ValueContent>
        </ValueContainer>
      </Values>
      <button
        onClick={() => {
          setStackedChart(!stackedChart);
        }}
      >
        Stack
      </button>
      <ChartsContainer>
        <ExpensesForecastLineChart />
        <PaymentsPieChart />
        <ExpensesBarChart stacked={stackedChart} />
      </ChartsContainer>
    </Container>
  );
};
