import { Chance } from "chance";

import { applySearchFilter } from "../filters";
import { Expense } from "../../views/expenses/types";

import { generate } from "./filter.tag.test";

const chance = new Chance();

describe("filter expenses by search", () => {
  it("should return all expenses matched to search", () => {
    const expenses: Expense[] = [];
    for (let i = 0; i < chance.integer({ min: 100, max: 1000 }); i++) {
      expenses.push(generate());
    }
    const res = applySearchFilter(expenses, expenses[0].name);
    expect(res.length).toBeGreaterThanOrEqual(1);
    res.forEach((e) => {
      expect(e.name).toContain(expenses[0].name);
    });
  });
});
