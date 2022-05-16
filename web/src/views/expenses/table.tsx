import _ from "lodash";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { useContext } from "react";

import { ExpensesContext } from "../../context/expenses";

import { StyledRow, StyledTD, StyledLabelTD, StyledTH } from "./styles";
import { Expense } from "./types";

const StyledTHead = styled.thead`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  background-color: #000;
  color: #fff;
`;

const StyledTFoot = styled.tfoot`
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  background-color: #000;
  color: #fff;
`;

const Table: React.FC<{
  headers: string[];
  rows: Expense[];
}> = ({ headers, rows }) => {
  return (
    <table style={{ width: "100%" }}>
      <StyledTHead>
        <tr>
          {headers.map((h, i) => (
            <StyledTH key={i}>{h}</StyledTH>
          ))}
        </tr>
      </StyledTHead>
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
      <StyledTFoot>
        <tr>
          <td></td>
          <td></td>
          <td>Total: {rows.reduce((v, c) => v + _.toNumber(c.price), 0)}</td>
          <td></td>
          <td></td>
        </tr>
      </StyledTFoot>
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
      <StyledTD>{new Date(expense.created_at).toLocaleString()}</StyledTD>
      <StyledTD>{expense.name}</StyledTD>
      <StyledTD>{expense.price}</StyledTD>
      <StyledLabelTD>
        <Labels tags={expense.tags} />
      </StyledLabelTD>
    </StyledRow>
  );
}

function Labels({ tags }: { tags: string[] }) {
  const { tags: colorized } = useContext(ExpensesContext);
  return (
    <>
      {tags.map((t, i) => {
        return (
          <Chip
            style={{
              backgroundColor: colorized.find((_t) => _t.name === t)?.color,
              marginLeft: "7px",
              marginRight: "2px",
            }}
            label={t}
            key={i}
          />
        );
      })}
    </>
  );
}

export default Table;
