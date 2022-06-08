import { Chance } from "chance";

import { applyFilterPayments } from "../filters";
import { Expense } from "../../views/expenses/types";

const chance = new Chance();
const tags = ["loan", "house", "pets", "kids", "personal", "car"];
const payments = ["cash", "oleg-credit", "ortal-credit", "sibus"];

function generate(): Expense {
  return {
    id: chance.guid({ version: 4 }),
    name: chance.name(),
    created_at: chance.timestamp().toLocaleString(),
    payment: payments[chance.integer({ min: 0, max: 1 })],
    price: chance.integer({ min: 10, max: 1000 }).toString(),
    tags: chance.pickset(tags, chance.integer({ min: 0, max: tags.length })),
  };
}

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
