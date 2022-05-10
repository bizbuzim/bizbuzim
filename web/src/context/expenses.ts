import { createContext } from "react";

import { Expense } from "./../views/expenses/types";

export const ExpensesContext = createContext<{
  isLoading: boolean;
  error?: string;
  expenses: Expense[];
  tags: string[];
  payments: string[];
}>({
  isLoading: true,
  expenses: [],
  tags: [],
  payments: [],
});
