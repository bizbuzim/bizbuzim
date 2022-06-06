import { createContext } from "react";
import { DateTime } from "luxon";

import { Expense } from "./../views/expenses/types";

export const FiltersContext = createContext<{
  dates: {
    from: DateTime;
    to: DateTime;
  };
  tags: string[];
  search: string;
  payments: string[];
}>({
  dates: {
    from: DateTime.local().minus({ days: 30 }),
    to: DateTime.local(),
  },
  tags: [],
  search: "",
  payments: [],
});

export function applyFilterTags(
  expenses: Expense[],
  tags: string[]
): Expense[] {
  return expenses.filter((e) => {
    return e.tags.some((t) => tags.includes(t));
  });
}
