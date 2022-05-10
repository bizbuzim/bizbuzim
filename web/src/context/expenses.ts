import { createContext } from "react";

import { Expense } from "./../views/expenses/types";

interface tag {
  name: string;
  color: string;
}

export const ExpensesContext = createContext<{
  isLoading: boolean;
  error?: string;
  expenses: Expense[];
  tags: tag[];
  payments: string[];
}>({
  isLoading: true,
  expenses: [],
  tags: [],
  payments: [],
});
