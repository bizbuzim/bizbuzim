import { Chance } from "chance";

import { applySearchFilter } from "../filters";
import { Expense } from "../../views/expenses/types";

import { generate } from "./filter.tag.test";

const chance = new Chance();

describe("filter expenses bt search", () => {
  it("shuld return all expenses realted to search", () => {
    const expenses: Expense[] = [];
    for (let i = 0; i < chance.integer({ min: 10, max: 100 }); i++) {
      expenses.push(generate());
    }
    const res = applySearchFilter(expenses, "loan");
    res.forEach((e) => {
      expect(e.name).toContain("loan");
    });
  });
});
