import { createContext } from "react";

export const FiltersContext = createContext<{
  dates: {
    from: Date;
    to: Date;
  };
  tags: string[];
}>({
  dates: {
    from: new Date("04/05/2022"),
    to: new Date(),
  },
  tags: [],
});