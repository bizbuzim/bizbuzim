import { useState, useEffect, useMemo } from "react";
import client from "./../services/gql";
import { GET_ALL_EXPENSES } from "../queries/get-all-expenses";
import styled from "styled-components";
import { useTable } from "react-table";
import { DatePicker } from "./date-picker";
import { Divider } from "./divider";

const Styles = styled.div`
  padding: 1rem;
  overflow: scroll;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const DatePickerContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 1em;
`;
interface Options {
  columns: any;
  data: any;
}

function Table({ columns, data }: Options) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function ExpensesTable() {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  useEffect(() => {
    const fetch = async () => {
      const res = await client.query({
        query: GET_ALL_EXPENSES,
        variables: {
          from: fromDate,
          to: toDate,
        },
      });

      setData(res.data.expenses);
    };

    fetch();
  }, [fromDate, toDate]);
  const columns = useMemo(
    () => [
      {
        Header: "Table",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Payment",
            accessor: "payment",
          },
          {
            Header: "Price",
            accessor: "price",
          },
          {
            Header: "Tags",
            accessor: "tags",
          },
        ],
      },
    ],
    []
  );
  return (
    <Styles>
      <DatePickerContainer>
        From:
        <DatePicker
          onDateChanged={(d) => {
            setFromDate(d);
          }}
        />
      </DatePickerContainer>
      <DatePickerContainer>
        To:{" "}
        <DatePicker
          onDateChanged={(d) => {
            setToDate(d);
          }}
        />
      </DatePickerContainer>
      <Divider />
      <Table columns={columns} data={data} />
    </Styles>
  );
}
