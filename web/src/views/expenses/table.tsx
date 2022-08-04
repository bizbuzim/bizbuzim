import _ from "lodash";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

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

const ButtonsContainer = styled.div<{ edit: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px 0px;
`;
const Item = styled.label`
  padding: 15px 15px 15px 5px;
`;

const Input = styled.input<{ disabled: boolean }>`
  border: ${(props) => props.disabled && "none"};
  outline: ${(props) => props.disabled && "none"};
  background-color: white;
  font-size: 15px;
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
  const [editExpense, setEditExpense] = useState(false);
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
          editExpense={editExpense}
          setEditExpense={setEditExpense}
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
      <DateTD date={expense.created_at} />
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
  editExpense,
  setEditExpense,
}: {
  open: boolean;
  expense?: Expense;
  setOpenSideDrawer: (val: boolean) => void;
  editExpense: boolean;
  setEditExpense: (val: boolean) => void;
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
        <ExpenseDetails expense={expense} editExpense={editExpense} />
        {editExpense && (
          <ButtonsContainer edit={editExpense}>
            <Button variant="contained" color="success">
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setEditExpense(!editExpense)}
            >
              Cancel
            </Button>
          </ButtonsContainer>
        )}
        <ButtonsContainer edit={editExpense}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditExpense(!editExpense);
            }}
          >
            Edit Expense
          </Button>
          <Button variant="contained">Delete Expense</Button>
        </ButtonsContainer>
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

function ExpenseDetails({
  expense,
  editExpense,
}: {
  expense: Expense;
  editExpense: boolean;
}) {
  return (
    <>
      <Item>
        Name:
        <Input
          type="text"
          value={expense.name}
          disabled={!editExpense}
          onChange={(e) => console.log(e.target.value)}
        />
      </Item>
      <Item>
        Date:
        <Input type="text" value={expense.created_at} disabled={!editExpense} />
      </Item>
      <Item>
        Payment:
        <Input type="text" value={expense.payment} disabled={!editExpense} />
      </Item>
      <Item>
        Price:
        <Input type="text" value={expense.price} disabled={!editExpense} />
      </Item>
      <Item>
        Tags: <Input type="text" value={expense.tags} disabled={!editExpense} />
      </Item>
    </>
  );
}

export default Table;
