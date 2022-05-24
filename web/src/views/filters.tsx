import React, { useContext } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DateTime } from "luxon";

import { BZSelect } from "../components/filters/select";
import { ExpensesContext } from "../context/expenses";

import { DatePicker } from "./../components/date-picker";

const FiltersContainer = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
  gap: 2rem;
`;

const FilterContainer = styled.div`
  margin: 0;
  max-width: 100%;
  max-height: 5em;
`;

export interface Props {
  fromDate: DateTime;
  fromDateChange: (d: DateTime) => void;
  toDate: DateTime;
  toDateChange: (d: DateTime) => void;
  tagsSelected: (tags: string[]) => void;
  paymentsSelected: (payments: string[]) => void;
  searchChange: (d: string) => void;
}
export const Filters: React.FC<Props> = ({
  fromDate,
  toDate,
  fromDateChange,
  toDateChange,
  tagsSelected,
  searchChange,
  paymentsSelected,
}) => {
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
          <BZSelect
            title="Tags"
            items={tags.map((t) => t.name)}
            onItemSelected={tagsSelected}
          />
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
};
