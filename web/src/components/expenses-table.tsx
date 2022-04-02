import { useState, useEffect } from "react";
import client from "./../services/gql";
import { GET_ALL_EXPENSES } from "../queries/get-all-expenses";
import styled from "styled-components";
import Chance from "chance";

const Styles = styled.div`
  padding: 1rem;
  overflow: scroll;
`;

const StyledLabeledText = styled.div`
  text-align: center;
  border-radius: 20px;
  background-color: ${() => {
    return new Chance().color({ format: "hex" });
  }};
  margin-right: 2px;
  margin-top: 2px;
  margin-bottom: 2px;
  min-width: 60px;
`;

const StyledLabelsContainer = styled.div`
  display: inline-flex;
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: auto 30px auto;
  min-height: 40px;
  text-align: center;
  grid-gap: 1rem;
  border-style: solid;
  border-color: #ccc;
  border-radius: 10px;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
function Row({ expense }: { expense: Expense }) {
  return (
    <StyledRow key={expense.id}>
      <div>{expense.name}</div>
      <div>{expense.price}</div>
      <StyledLabelsContainer>
        {expense.tags.map((t, i) => {
          return (
            <StyledLabeledText key={i + Date.now()}>{t}</StyledLabeledText>
          );
        })}
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
