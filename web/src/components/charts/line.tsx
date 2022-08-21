import React, { useContext, useMemo } from "react";
import _ from "lodash";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";

import { ExpensesContext } from "../../context/expenses";
import { Expense } from "../../views/expenses/types";
import { FiltersContext } from "../../context/filters";

import { buildDates, formatISODate } from "./date";
import { ChartShadowContainer } from "./container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    x: {
      display: false,
    },
  },
};

const ExpensesForecastLineChart: React.FC = () => {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const {
    dates: { from, to },
  } = useContext(FiltersContext);

  const { datasets, labels } = useMemo(
    () => buildDataset(expenses, from, to),
    [expenses, from, to]
  );
  if (isLoading) {
    return <></>;
  }
  return (
    <ChartShadowContainer width="40vw">
      <Line
        options={options}
        data={{
          datasets,
          labels,
        }}
      />
    </ChartShadowContainer>
  );
};

function buildDataset(expenses: Expense[], from: DateTime, to: DateTime) {
  const labels: { [key: string]: number } = {};
  _.forEach(buildDates(from, to), (date, index) => {
    labels[date] = index;
  });
  const now = DateTime.local();
  const dates = _.chain(expenses)
    .map((e) => DateTime.fromISO(e.expensed_at))
    .uniq()
    .reverse()
    .value();
  const first = _.head(dates);
  const today = _.last(_.filter(dates, (e) => e < now));
  const todayIndex = labels[today?.toFormat("dd/MM/yyyy") || ""];
  const last = _.last(dates);
  const dataset = {
    data: new Array(_.size(labels)).fill(undefined),
    label: `${formatDate(first)} - ${formatDate(today)}`,
    borderColor: "rgb(99, 130, 255)",
    backgroundColor: "rgba(99, 104, 255, 0.5)",
  };
  const forecast = {
    data: new Array(_.size(labels)).fill(undefined),
    label: `forcast: ${formatDate(today)} - ${formatDate(last)}`,
    borderColor: "rgb(255, 99, 99)",
    backgroundColor: "rgba(255, 99, 99, 0.5)",
  };
  const daily = new Array(_.size(labels)).fill(0);
  expenses.forEach((e) => {
    const label = formatISODate(e.expensed_at);
    daily[labels[label]] =
      _.toNumber(e.price) + _.toNumber(daily[labels[label]]);
  });
  let sum = 0;
  daily.forEach((d, i) => {
    if (i > todayIndex) {
      forecast.data[i] = sum + d;
    } else {
      dataset.data[i] = sum + d;
    }
    sum += d;
  });

  return {
    labels: _.keys(labels),
    datasets: [dataset, forecast],
  };
}

function formatDate(d: DateTime | undefined): string {
  if (!d) {
    return "";
  }
  return d.toFormat("dd/MM");
}

export default ExpensesForecastLineChart;
