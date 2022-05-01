import Chance from "chance";
import _ from "lodash";
import Chip from "@mui/material/Chip";

import { StyledRow, StyledTD, StyledLabelTD, StyledTH } from "./styles";
import { Expense } from "./types";

const Table = ({ headers, rows }: { headers: string[]; rows: Expense[] }) => {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <StyledTH key={i}>{h}</StyledTH>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((v, i) => (
          <Row
            key={i}
            index={i}
            expense={v}
            color={i % 2 === 0 ? "gray" : "white"}
          />
        ))}
      </tbody>
      <tfoot style={{ backgroundColor: "gray" }}>
        <tr>
          <td></td>
          <td></td>
          <td>Total: {rows.reduce((v, c) => v + _.toNumber(c.price), 0)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

function Row({
  index,
  expense,
  color,
}: {
  index: number;
  expense: Expense;
  color: string;
}) {
  return (
    <StyledRow key={expense.id} color={color}>
      <StyledTD>{index + 1}</StyledTD>
      <StyledTD>{expense.name}</StyledTD>
      <StyledTD>{expense.price}</StyledTD>
      <StyledLabelTD>
        {expense.tags.map((t, i) => {
          const c = new Chance();
          const color = c.color({ format: "hex" });
          return (
            <Chip
              style={{
                backgroundColor: color,
                marginLeft: "7px",
                marginRight: "2px",
              }}
              label={t}
              key={i}
            />
          );
        })}
      </StyledLabelTD>
    </StyledRow>
  );
}

export default Table;
