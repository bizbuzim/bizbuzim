import { useContext } from "react";
import _ from "lodash";
import styled from "styled-components";
import { BsFilter } from "react-icons/bs";
import TextField from "@mui/material/TextField";

import BZSelect from "../components/filters/select";
import { ExpensesContext } from "../context/expenses";

import { DatePicker } from "./../components/date-picker";

const FiltersContainer = styled.div`
  display: inline-flex;
`;

const FilterContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: 1em;
  margin-bottom: 0;
  min-width: 10em;
  max-width: 15em;
  max-height: 5em;
`;

export interface Props {
  fromDate: Date;
  fromDateChange: (d: Date) => void;
  toDate: Date;
  toDateChange: (d: Date) => void;
  tagsSelected: (tags: string[]) => void;
  paymentsSelected: (payments: string[]) => void;
  searchChange: (d: string) => void;
}
export function Filters({
  fromDate,
  toDate,
  fromDateChange,
  toDateChange,
  tagsSelected,
  searchChange,
  paymentsSelected,
}: Props) {
  const { isLoading, error, tags, payments } = useContext(ExpensesContext);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return (
      <>
        <div>error: {error}</div>
      </>
    );
  }
  return (
    <>
      <FiltersContainer>
        <BsFilter size={"2em"} />
        <FilterContainer>
          <TextField
            onChange={(e) => searchChange(e.target.value)}
            label="Search"
          />
        </FilterContainer>
        <FilterContainer>
          <DatePicker
            initial={fromDate}
            label="Date From"
            onDateChanged={fromDateChange}
          />
        </FilterContainer>
        <FilterContainer>
          <DatePicker
            initial={toDate}
            label="Date To"
            onDateChanged={toDateChange}
          />
        </FilterContainer>
        <FilterContainer>
          <BZSelect title="Tags" items={tags} onItemSelected={tagsSelected} />
        </FilterContainer>
        <FilterContainer>
          <BZSelect
            title="Payments"
            items={payments}
            onItemSelected={paymentsSelected}
          />
        </FilterContainer>
      </FiltersContainer>
    </>
  );
}
