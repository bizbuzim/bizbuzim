import { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "./../components/date-picker";
import { ExpensesTable } from "./../components/expenses-table";
import { Divider } from "./../components/divider";
const Container = styled.div`
  display: grid;
  grid-template-areas:
    "filter filter filter"
    "table table table";
`;

const FilterContainer = styled.div`
  grid-area: filter;
`;

const TableContainer = styled.div`
  grid-area: table;
`;

const DatePickerContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 1em;
`;

export function Expenses() {
  const [fromDate, setFromDate] = useState(new Date("2022-03-01"));
  const [toDate, setToDate] = useState(new Date());
  return (
    <Container>
      <FilterContainer>
        <DatePickerContainer>
          From:
          <DatePicker
            initial={fromDate}
            onDateChanged={(d) => {
              setFromDate(d);
            }}
          />
        </DatePickerContainer>
        <DatePickerContainer>
          To:{" "}
          <DatePicker
            initial={toDate}
            onDateChanged={(d) => {
              setToDate(d);
            }}
          />
        </DatePickerContainer>
        <Divider />
      </FilterContainer>
      <TableContainer>
        <ExpensesTable dateFrom={fromDate} dateTo={toDate} />
      </TableContainer>
    </Container>
  );
}
