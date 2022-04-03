import { useState, useEffect } from "react";
import client from "./../services/gql";
import { GET_ALL_EXPENSES } from "../queries/get-all-expenses";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Chance from "chance";
import Chip from "@mui/material/Chip";

const Styles = styled.div`
  padding: 1rem;
  overflow: scroll;
`;

const StyledLabelsContainer = styled.div`
  display: inline-flex;
  min-width: 5em;
`;

const StyledRowActions = styled.div`
  align-self: center;
  direction: rtl;
  min-width: 2em;
`;

const StyledRowPrice = styled.div`
  min-width: 5em;
  margin-right: auto;
  margin-left: 4em;
`;

const StyledRowName = styled.div`
  min-width: 5em;
  width: 100px;
  flex-shrink: 0;
  margin-left: 1em;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  min-height: 40px;
  border-style: solid;
  border-color: #ccc;
  border-radius: 10px;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
function Row({ expense }: { expense: Expense }) {
  return (
    <StyledRow key={expense.id}>
      <StyledRowName>{expense.name}</StyledRowName>
      <StyledRowPrice>{expense.price}</StyledRowPrice>
      <StyledLabelsContainer>
        {expense.tags.map((t, i) => {
          const c = new Chance();
          const color = c.color({ format: "hex" });
          return (
            <Chip
              style={{
                backgroundColor: color,
              }}
              label={t}
              key={i}
            />
          );
        })}
        <StyledRowActions>
          <BiDotsVerticalRounded size={"1.4em"} />
        </StyledRowActions>
      </StyledLabelsContainer>
    </StyledRow>
  );
}
interface Expense {
  id: string;
  name: string;
  payment: string;
  tags: string[];
  price: string;
}

interface Props {
  dateFrom: Date;
  dateTo: Date;
}
export function ExpensesTable(props: Props) {
  const [data, setData] = useState<Expense[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await client.query({
        query: GET_ALL_EXPENSES,
        variables: {
          from: props.dateFrom,
          to: props.dateTo,
        },
      });
      setData(res.data.expenses);
    };

    fetch();
  }, [props.dateFrom, props.dateTo]);
  return (
    <Styles>
      {data.map((v, i) => {
        return <Row key={i} expense={v} />;
      })}
    </Styles>
  );
}
