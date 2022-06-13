import { Chance } from "chance";

import { applyFilterPayments } from "../filters";
import { Expense } from "../../views/expenses/types";

import { generate } from "./filter.tag.test";
const chance = new Chance();

describe("filter expenses by payments", () => {
  it("should return expenses related to selected payments", () => {
    const expenses: Expense[] = [];
    for (let i = 0; i < chance.integer({ min: 10, max: 100 }); i++) {
      expenses.push(generate());
    }
    const res = applyFilterPayments(expenses, ["cash"]);
    res.forEach((e) => {
      expect(e.payment).toEqual("cash");
    });
  });
});
