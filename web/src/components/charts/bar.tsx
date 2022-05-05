import _ from "lodash";
import { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ExpensesContext } from "../../context/expenses";
import { Expense } from "../../views/expenses/types";

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
