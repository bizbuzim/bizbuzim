import { useContext, useMemo, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { BsFilter } from "react-icons/bs";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface Props {
  fromDate: Date;
  fromDateChange: (d: Date) => void;
  toDate: Date;
  toDateChange: (d: Date) => void;
  tagsSelected: (tags: string[]) => void;
}
export function Filters({
  fromDate,
  toDate,
  fromDateChange,
  toDateChange,
  tagsSelected,
}: Props) {
  const { isLoading, error, tags } = useContext(ExpensesContext);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const uniqueTags = useMemo(
    () => tags.map((t) => Object.assign({}, { value: t, label: t })),
    [tags]
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
  return (
    <>
      <FiltersContainer>
        <BsFilter size={"2em"} />
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
          <Select
            multiple
            value={selectedTags}
            onChange={(event: SelectChangeEvent<string[]>) => {
              const {
                target: { value },
              } = event;
              const r = typeof value === "string" ? value.split(",") : value;
              tagsSelected(r);
              setSelectedTags(r);
            }}
            input={<OutlinedInput />}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: string) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {uniqueTags.map((tag, i) => (
              <MenuItem key={tag.label} value={tag.value}>
                {tag.label}
              </MenuItem>
            ))}
          </Select>
        </FilterContainer>
      </FiltersContainer>
    </>
  );
}
