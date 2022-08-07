import _ from "lodash";
import React, { useContext, useMemo } from "react";
import Chance from "chance";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DateTime } from "luxon";

import { ExpensesContext } from "../../context/expenses";
import { FiltersContext } from "../../context/filters";
import { Expense } from "../../views/expenses/types";

import { buildDates, formatISODate } from "./date";
import { ChartShadowContainer } from "./container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ExpensesBarChart: React.FC<{ stacked: boolean }> = ({
  stacked,
}) => {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const {
    tags,
    search,
    payments,
    dates: { from, to },
  } = useContext(FiltersContext);
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
  const { datasets, labels } = useMemo(
    () =>
      stacked
        ? buildStackedDataset(filtered, from, to)
        : buildDataset(filtered, from, to),
    [filtered, stacked, from, to]
  );
  const options = {
    plugins: {
      title: {
        display: true,
        text: `Expenses ${labels[0]} - ${_.last(labels)}`,
      },
    },
    scales: {
      x: {
        stacked,
      },
      y: {
        stacked,
      },
    },
  };
  if (isLoading) {
    return <></>;
  }
  return (
    <ChartShadowContainer width="50vw">
      <Bar options={options} data={{ labels, datasets }} />
    </ChartShadowContainer>
  );
};

function buildDataset(filtered: Expense[], from: DateTime, to: DateTime) {
  const labels: { [key: string]: number } = {};
  _.forEach(buildDates(from, to), (date, index) => {
    labels[date] = index;
  });

  const dataset = {
    label: "",
    data: new Array(_.size(labels)).fill("0"),
    backgroundColor: "rgb(99, 109, 255)",
  };
  filtered.forEach((e) => {
    const label = formatISODate(e.expensed_at);
    dataset.data[labels[label]] =
      _.toNumber(e.price) + _.toNumber(dataset.data[labels[label]]);
  });
  return {
    datasets: [dataset],
    labels: _.keys(labels),
  };
}

function buildStackedDataset(
  filtered: Expense[],
  from: DateTime,
  to: DateTime
) {
  const labels: { [key: string]: number } = {};
  _.forEach(buildDates(from, to), (date, index) => {
    labels[date] = index;
  });
  const labelsSize = _.size(labels);
  const newArray = () => new Array(labelsSize).fill("0");
  const defaultLabel = "no-tag";
  interface ds {
    label: string;
    data: string[];
    backgroundColor: string;
  }
  const color = () => new Chance().color({ format: "hex" });
  const datasets: { [key: string]: ds } = {
    [defaultLabel]: {
      backgroundColor: color(),
      data: newArray(),
      label: defaultLabel,
    },
  };
  _.chain(filtered)
    .map((e) => e.tags)
    .flattenDeep()
    .uniq()
    .forEach((label) => {
      datasets[label] = {
        backgroundColor: color(),
        label,
        data: newArray(),
      };
    })
    .value();
  _.chain(filtered)
    .forEach((e) => {
      const tag = _.get(e, "tags", [defaultLabel])[0];
      const i = labels[DateTime.fromISO(e.expensed_at).toFormat("dd/MM/yyyy")];
      datasets[tag].data[i] = e.price;
    })
    .value();
  return {
    datasets: _.map(datasets, (k) => k),
    labels: _.keys(labels),
  };
}
