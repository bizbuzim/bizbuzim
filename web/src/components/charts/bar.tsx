import _ from "lodash";
import React, { PureComponent, useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ExpensesContext } from "../../context/expenses";
import { Expense } from "../../views/expenses/types";

const d = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export function ExpensesBarChart() {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const data = useMemo(() => {
    const groups: { [key: string]: Expense[] } = {};
    expenses.forEach((e) => {
      const date = new Date(e.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(e);
    });
    return _.map(groups, (v, k) => {
      return {
        name: k,
        price: v.reduce((p, c) => p + _.toNumber(c.price), 0),
      };
    });
  }, [expenses]);
  if (isLoading) {
    return <></>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
