import React, { useContext, useMemo } from "react";
import _ from "lodash";
import Chance from "chance";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { Expense } from "../../views/expenses/types";
import { ExpensesContext } from "../../context/expenses";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {};

const PaymentsPieChart: React.FC = () => {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const { labels, datasets } = useMemo(
    () => buildDataset(expenses),
    [expenses]
  );
  if (isLoading) {
    return <></>;
  }
  const data = {
    labels,
    datasets,
    borderWidth: 1,
  };
  return <Pie data={data} />;
};

function buildDataset(expenses: Expense[]) {
  const color = () => new Chance().color({ format: "rgba" });
  const labels: { [key: string]: { index: number; color: string } } = {};
  _.chain(expenses)
    .map((e) => e.payment)
    .uniq()
    .forEach((p, index) => (labels[p] = { index, color: color() }))
    .value();

  const data = new Array(_.size(labels)).fill(0);
  _.map(expenses, (e) => {
    const p = e.payment;
    const { index } = labels[p];
    data[index] = data[index] + _.toNumber(e.price);
  });
  const backgroundColor = _.map(labels, (l) => l.color);
  const dataset = {
    label: "Payments",
    data,
    backgroundColor,
    borderWidth: 1,
  };
  return { labels: _.keys(labels), datasets: [dataset] };
}

export default PaymentsPieChart;
