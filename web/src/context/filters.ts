import { createContext } from "react";
import { DateTime } from "luxon";

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
