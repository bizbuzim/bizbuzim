import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTime } from "luxon";

import { BZSelect } from "../components/filters/select";
import { SavedFilterData } from "../components/filters/saved";
import { FilterModalContent } from "../components/filters/saveModal";
import { SideDrawer } from "../components/filters/sideDrawer";
import { ExpensesContext } from "../context/expenses";
import { useLocalStorage } from "../hooks/localstorage";

import { DatePicker } from "./../components/date-picker";

const SavedFilterLocalStorageKey = "bizbuzi.savedFilters";

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
  max-height: 10vh;
`;

export interface Props {
  fromDate: DateTime;
  fromDateChange: (d: DateTime) => void;
  toDate: DateTime;
  toDateChange: (d: DateTime) => void;
  initialTags: string[];
  tagsSelected: (tags: string[]) => void;
  initialPayments: string[];
  paymentsSelected: (payments: string[]) => void;
  initialSearch: string;
  searchChange: (d: string) => void;
}
export const Filters: React.FC<Props> = ({
  fromDate,
  fromDateChange,
  toDate,
  toDateChange,
  initialTags,
  tagsSelected,
  initialPayments,
  paymentsSelected,
  initialSearch,
  searchChange,
}) => {
  const { isLoading, error, tags, payments } = useContext(ExpensesContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [savedFilters, setSavedFilters] = useLocalStorage<SavedFilterData[]>(
    SavedFilterLocalStorageKey,
    []
  );

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

  const filters = (
    <FiltersContainer>
      <FilterContainer>
        <TextField
          onChange={(e) => {
            const search = e.target.value;
            searchChange(search);
          }}
          label="Search"
          value={initialSearch}
          variant={"outlined"}
        />
      </FilterContainer>
      <FilterContainer>
        <DatePicker
          initial={fromDate}
          label="Date From"
          onDateChanged={(d) => {
            fromDateChange(d);
          }}
        />
      </FilterContainer>
      <FilterContainer>
        <DatePicker
          initial={toDate}
          label="Date To"
          onDateChanged={(d) => {
            toDateChange(d);
          }}
        />
      </FilterContainer>
      <FilterContainer>
        <BZSelect
          title="Tags"
          items={tags.map((t) => t.name)}
          onItemSelected={(tags) => {
            tagsSelected(tags);
          }}
          initial={initialTags}
        />
      </FilterContainer>
      <FilterContainer>
        <BZSelect
          title="Payments"
          items={payments}
          onItemSelected={(payments) => {
            paymentsSelected(payments);
          }}
          initial={initialPayments}
        />
      </FilterContainer>
      <Button
        onClick={() => {
          setShowFilterModal(true);
        }}
      >
        Save
      </Button>
      <Button onClick={() => setShowSideBar(!showSideBar)}>Show Saved</Button>
    </FiltersContainer>
  );
  return (
    <>
      {filters}
      <SideDrawer
        open={showSideBar}
        onClose={() => setShowSideBar(!showSideBar)}
        filters={savedFilters}
        onSelected={(id) => {
          const copy = savedFilters.find((f) => f.id === id);
          if (!copy) {
            return;
          }
          if (copy.dates.to) {
            const to = DateTime.fromISO(copy.dates.to.toString());
            toDateChange(to);
          }
          if (copy.dates.from) {
            const from = DateTime.fromISO(copy.dates.from.toString());
            fromDateChange(from);
          }

          searchChange(copy.search);
          tagsSelected(copy.tags);
          paymentsSelected(copy.payments);
        }}
        onDeleted={(id) => {
          const index = savedFilters.findIndex((f) => f.id === id);
          if (index === -1) {
            return;
          }
          savedFilters.splice(index, 1);
          setSavedFilters([...savedFilters]);
        }}
      />
      <FilterModalContent
        open={showFilterModal}
        close={() => setShowFilterModal(false)}
        onClose={(name) => {
          const filter: SavedFilterData = {
            name,
            id: v4(),
            dates: {
              from: fromDate,
              to: toDate,
            },
            payments: initialPayments,
            tags: initialTags,
            search: initialSearch,
          };
          savedFilters.push(filter);
          setSavedFilters([...savedFilters]);
        }}
      />
    </>
  );
};
