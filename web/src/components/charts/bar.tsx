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
import Chance from "chance";

import { ExpensesContext } from "../../context/expenses";
import { FiltersContext } from "../../context/filters";
import { Expense } from "../../views/expenses/types";

interface processedExpense extends Expense {
  processed: boolean;
}
export function ExpensesBarChart({ stacked }: { stacked: boolean }) {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const { tags, search } = useContext(FiltersContext);
  let filtered = expenses;
  if (tags.length > 0) {
    filtered = expenses.filter((e) => {
      return e.tags.some((t) => tags.includes(t));
    });
  }
  if (search) {
    filtered = filtered.filter((e) => e.name.includes(search));
  }
  const { dates } = useMemo(() => {
    const groups: {
      [key: string]: {
        expenses: processedExpense[];
        uniqueTags: Set<string>;
      };
    } = {};
    filtered.forEach((e) => {
      const date = new Date(e.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = {
          expenses: [],
          uniqueTags: new Set(),
        };
      }
      groups[date].expenses.push({ ...e, processed: false });
      e.tags.forEach((t) => {
        groups[date].uniqueTags.add(t);
      });
    });
    return { dates: groups };
  }, [filtered]);
  const data = useMemo(() => {
    return _.map(dates, (v, k) => {
      const res: {
        name: string;
        price: number;
        tags: { [key: string]: number };
      } = {
        name: k,
        price: v.expenses.reduce((p, c) => p + _.toNumber(c.price), 0),
        tags: {},
      };
      v.uniqueTags.forEach((t) => {
        res.tags[t] = v.expenses.reduce((p, c) => {
          if (c.processed) {
            return p;
          }
          if (!c.tags.includes(t)) {
            return p;
          }
          c.processed = true;
          return p + _.toNumber(c.price);
        }, 0);
      });
      return res;
    });
  }, [dates]);
  const uniqTags = _.chain(filtered)
    .map((e) => e.tags)
    .flattenDeep()
    .uniq()
    .compact()
    .value();
  if (isLoading) {
    return <></>;
  }
  let bars = <Bar dataKey="price" stackId="a" fill="#8884d8" />;
  if (stacked) {
    bars = (
      <>
        {uniqTags.map((t, i) => (
          <Bar
            dataKey={`tags.${t}`}
            stackId={"a"}
            key={i}
            fill={new Chance().color({ format: "hex" })}
          />
        ))}
      </>
    );
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
        {bars}
      </BarChart>
    </ResponsiveContainer>
  );
}
