import { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";
import Select from "react-select";
import { DatePicker } from "./../components/date-picker";
import client from "./../services/gql";
import { GET_TAGS } from "../queries/get-tags";

const FilterContainer = styled.div``;

const DatePickerContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 1em;
`;

export interface Props {
  fromDate?: Date;
  fromDateChange: (d: Date) => void;
  toDate?: Date;
  toDateChange: (d: Date) => void;
}
export function Filters(props: Props) {
  const [fromDate, setFromDate] = useState(
    props.fromDate || new Date("2022-03-01")
  );
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
    <FilterContainer>
      <DatePickerContainer>
        From:
        <DatePicker
          initial={fromDate}
          onDateChanged={(d) => {
            setFromDate(d);
            props.fromDateChange(d);
          }}
        />
      </DatePickerContainer>
      <DatePickerContainer>
        To:{" "}
        <DatePicker
          initial={toDate}
          onDateChanged={(d) => {
            setToDate(d);
            props.toDateChange(d);
          }}
        />
      </DatePickerContainer>
      <Select options={tags} isMulti={true} />
    </FilterContainer>
  );
}
