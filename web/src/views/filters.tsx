import { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";
import Select from "react-select";
import { BsFilter } from "react-icons/bs";
import { DatePicker } from "./../components/date-picker";
import client from "./../services/gql";
import { GET_TAGS } from "../queries/get-tags";

const FiltersContainer = styled.div`
  display: inline-flex;
`;

const FilterContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: 1em;
  min-width: 10em;
  max-width: 15em;
`;

export interface Props {
  fromDate?: Date;
  fromDateChange: (d: Date) => void;
  toDate?: Date;
  toDateChange: (d: Date) => void;
}
export function Filters(props: Props) {
  const [fromDate, setFromDate] = useState(props.fromDate || new Date());
  const [toDate, setToDate] = useState(props.toDate || new Date());
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await client.query({
        query: GET_TAGS,
        variables: {
          from: fromDate,
          to: toDate,
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
    <FiltersContainer>
      <BsFilter size={"2em"} />
      <FilterContainer>
        <DatePicker
          initial={fromDate}
          label="Date From"
          onDateChanged={(d) => {
            setFromDate(d);
            props.fromDateChange(d);
          }}
        />
      </FilterContainer>
      <FilterContainer>
        <DatePicker
          initial={toDate}
          label="Date To"
          onDateChanged={(d) => {
            setToDate(d);
            props.toDateChange(d);
          }}
        />
      </FilterContainer>
      <FilterContainer>
        Tags: w <Select options={tags} isMulti={true} />
      </FilterContainer>
    </FiltersContainer>
  );
}
