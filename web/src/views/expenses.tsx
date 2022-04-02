import styled from "styled-components";
import { ExpensesTable } from "./../components/expenses-table";

const TableContainer = styled.div``;

export interface Props {
  fromDate: Date;
  toDate: Date;
}
export function Expenses({ fromDate, toDate }: Props) {
  return (
    <TableContainer>
      <ExpensesTable dateFrom={fromDate} dateTo={toDate} />
    </TableContainer>
  );
}
