import _ from "lodash";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

import { ExpensesContext } from "../../context/expenses";

import { StyledRow, StyledTD, StyledLabelTD, StyledTH } from "./styles";
import DateTD from "./date";
import CurrencyTD from "./currency";
import { Expense } from "./types";

const StyledTHead = styled.thead`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #f1f5f9;
`;

const StyledTFoot = styled.tfoot`
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  background-color: #f1f5f9;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Expense>();

  const selectedRowHandle = (expense: Expense) => {
    setOpenSideDrawer(!openSideDrawer);
    setSelectedRow(expense);
  };
  return (
    <>
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
            <Row
              key={i}
              index={i}
              expense={v}
              selectedRowHandle={selectedRowHandle}
            />
          ))}
        </tbody>
        <StyledTFoot>
          <StyledRow>
            {headers.map((h, i) => {
              const data = rows
                .reduce((v, c) => v + _.toNumber(c.price), 0)
                .toFixed(2);
              return (
                <StyledTD key={i} style={{ flex: h.weight }}>
                  {i === 3 ? data : ""}
                </StyledTD>
              );
            })}
          </StyledRow>
        </StyledTFoot>
      </table>
      <DrawerContainer>
        <SideDrawer
          open={openSideDrawer}
          setOpenSideDrawer={setOpenSideDrawer}
          expense={selectedRow}
        />
      </DrawerContainer>
    </>
  );
};

function Row({
  index,
  expense,
  selectedRowHandle,
}: {
  index: number;
  expense: Expense;
  selectedRowHandle: (expense: Expense) => void;
}) {
  return (
    <StyledRow key={expense.id} onClick={() => selectedRowHandle(expense)}>
      <StyledTD style={{ flex: 1 }}>{index + 1}</StyledTD>
      <DateTD date={expense.expensed_at} />
      <StyledTD style={{ flex: 5 }}>{expense.name}</StyledTD>
      <CurrencyTD price={expense.price} />
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

function SideDrawer({
  open,
  expense,
  setOpenSideDrawer,
}: {
  open: boolean;
  expense?: Expense;
  setOpenSideDrawer: (val: boolean) => void;
}) {
  let content = <></>;
  if (expense) {
    content = (
      <>
        <ExpenseHeader>
          <h2>Expense Details</h2>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => setOpenSideDrawer(!open)}
          />
        </ExpenseHeader>
        <ExpenseDetails expense={expense} />
      </>
    );
  }
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
      {content}
    </Drawer>
  );
}

function ExpenseDetails({ expense }: { expense: Expense }) {
  return (
    <>
      <Item>Name: {expense.name}</Item>
      <Item>Date: {expense.expensed_at}</Item>
      <Item>Payment: {expense.payment}</Item>
      <Item>Price: {expense.price}</Item>
      <Item>Tags: {expense.tags}</Item>
    </>
  );
}

export default Table;
