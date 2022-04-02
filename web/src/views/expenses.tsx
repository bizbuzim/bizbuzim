import { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";
import { DatePicker } from "./../components/date-picker";
import { ExpensesTable } from "./../components/expenses-table";
import { Divider } from "./../components/divider";
import Select from "react-select";
import client from "./../services/gql";
import { GET_TAGS } from "../queries/get-tags";

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
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
  const [tagsQuery, setTagsQuery] = useState<any[]>([
    { tags: { contains: ["חופשה"] } },
    { tags: { contains: ["אוכל-בחוץ"] } },
  ]);
  useEffect(() => {
    const fetch = async () => {
      const res = await client.query({
        query: GET_TAGS,
        variables: {
          from: fromDate,
          to: toDate,
          tags: JSON.stringify(tagsQuery),
        },
      });
      const t = _.map(res.data.expenses, (v) => v.tags);
      const f = _.flatten(t);
      const u = _.uniq(f);
      setTags(
        _.map(u, (vv) => {
          return { value: vv, label: vv };
        })
      );
    };
    fetch();
  }, [tags.length]);
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
        <Select options={tags} isMulti={true} />
        <Divider />
      </FilterContainer>
      <TableContainer>
        <ExpensesTable dateFrom={fromDate} dateTo={toDate} />
      </TableContainer>
    </Container>
  );
}
