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
<<<<<<< Updated upstream
  scales: {
    x: {
      display: false,
    },
  },
=======
>>>>>>> Stashed changes
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
  const lastDayWithExpenses = _.chain(expenses)
    .map((e) => formatISODate(e.created_at))
    .uniq()
    .reverse()
    .last()
    .value();
  const lastIndex = labels[lastDayWithExpenses];
  const dataset = {
    data: new Array(lastIndex).fill(0),
    label: `${from.toFormat("dd/MM")} - ${to.toFormat("dd/MM")}`,
    borderColor: "rgb(99, 130, 255)",
    backgroundColor: "rgba(99, 104, 255, 0.5)",
  };
  const daily = new Array(_.size(labels)).fill(0);
  expenses.forEach((e) => {
    const label = formatISODate(e.created_at);
    daily[labels[label]] =
      _.toNumber(e.price) + _.toNumber(daily[labels[label]]);
  });
  daily.forEach((d, i) => {
    if (i >= lastIndex) {
      return;
    }
    dataset.data[i] = d + _.get(dataset, `data.${i - 1}`, 0);
  });

  const forecast = {
    data: new Array(_.size(labels) + lastIndex).fill(undefined),
    label: "Forecast",
    borderColor: "rgb(255, 99, 99)",
    backgroundColor: "rgba(255, 99, 99, 0.5)",
  };
  const last = _.last(dataset.data);
  forecast.data = _.map(forecast.data, (k, i) => {
    if (i + 1 < lastIndex) {
      return undefined;
    }
    return last;
  });
  return {
    labels: _.keys(labels),
    datasets: [dataset, forecast],
  };
}

export default ExpensesForecastLineChart;
