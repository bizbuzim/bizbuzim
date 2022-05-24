import _ from "lodash";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

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

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpenseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.span`
  padding: 15px 15px 15px 5px;
`;
const Table: React.FC<{
  headers: string[];
  rows: Expense[];
}> = ({ headers, rows }) => {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Expense | null>(null);

  const selectedRowHandle = (expense: Expense) => {
    setOpenSideDrawer(!openSideDrawer);
    setSelectedRow(expense);
  };

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
            selectedRowHandle={selectedRowHandle}
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
      <DrawerContainer>
        <SideDrawer
          open={openSideDrawer}
          setOpenSideDrawer={setOpenSideDrawer}
          expense={selectedRow}
        />
      </DrawerContainer>
    </table>
  );
};

function Row({
  index,
  expense,
  color,
  selectedRowHandle,
}: {
  index: number;
  expense: Expense;
  color: string;
  selectedRowHandle: (expense: Expense) => void;
}) {
  return (
    <StyledRow
      key={expense.id}
      color={color}
      onClick={() => selectedRowHandle(expense)}
    >
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

function SideDrawer({
  open,
  expense,
  setOpenSideDrawer,
}: {
  open: boolean;
  expense: Expense | null;
  setOpenSideDrawer: (val: boolean) => void;
}) {
  return (
    <Drawer
      sx={{
        "& .MuiPaper-root": {
          width: "30%",
          padding: "20px",
        },
      }}
      anchor="right"
      open={open}
      onClose={() => setOpenSideDrawer(!open)}
    >
      <ExpenseHeader>
        <h2>Expense Details</h2>
        <CloseIcon onClick={() => setOpenSideDrawer(!open)} />
      </ExpenseHeader>
      <ExpenseDetails expense={expense} />
    </Drawer>
  );
}

function ExpenseDetails({ expense }: { expense: Expense | null }) {
  return (
    <>
      <Item>Name: {expense && expense.name}</Item>
      <Item>Date: {expense && expense.created_at}</Item>
      <Item>Payment: {expense && expense.payment}</Item>
      <Item>Price: {expense && expense.price}</Item>
      <Item>Tags: {expense && expense.tags}</Item>
    </>
  );
}

export default Table;
