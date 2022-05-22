import _ from "lodash";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { useContext } from "react";

import { ExpensesContext } from "../../context/expenses";

import { StyledRow, StyledTD, StyledLabelTD, StyledTH } from "./styles";
import DateTD from "./date";
import { Expense } from "./types";

const StyledTHead = styled.thead`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledTFoot = styled.tfoot`
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  background-color: #000;
  color: #fff;
`;
const headers = [
  { name: "No.", weight: 1 },
  { name: "Date", weight: 3 },
  { name: "Name", weight: 5 },
  { name: "Price", weight: 3 },
  { name: "Labels", weight: 2 },
];
const Table: React.FC<{
  rows: Expense[];
}> = ({ rows }) => {
  return (
    <table
      style={{
        width: "100%",
      }}
    >
      <StyledTHead>
        <StyledRow>
          {headers.map((h, i) => (
            <StyledTH key={i} style={{ flex: h.weight }}>
              {h.name}
            </StyledTH>
          ))}
        </StyledRow>
      </StyledTHead>
      <tbody style={{ overflowY: "hidden" }}>
        {rows.map((v, i) => (
          <Row key={i} index={i} expense={v} />
        ))}
      </tbody>
      <StyledTFoot>
        <StyledRow>
          <td></td>
          <td></td>
          <td>Total: {rows.reduce((v, c) => v + _.toNumber(c.price), 0)}</td>
          <td></td>
          <td></td>
        </StyledRow>
      </StyledTFoot>
    </table>
  );
};

function Row({ index, expense }: { index: number; expense: Expense }) {
  return (
    <StyledRow key={expense.id}>
      <StyledTD style={{ flex: 1 }}>{index + 1}</StyledTD>
      <DateTD date={expense.created_at} />
      <StyledTD style={{ flex: 5 }}>{expense.name}</StyledTD>
      <StyledTD style={{ flex: 3 }}>{expense.price}</StyledTD>
      <StyledLabelTD style={{ flex: 2, overflowX: "hidden" }}>
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
