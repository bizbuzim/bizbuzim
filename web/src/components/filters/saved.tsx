import { DateTime } from "luxon";
import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: x-large;
`;
const Text = styled.div``;
const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export interface SavedFilterData {
  name: string;
  id: string;
  tags: string[];
  payments: string[];
  dates: {
    from?: DateTime;
    to?: DateTime;
  };
  search: string;
}

export const SavedFilter: React.FC<{
  filter: SavedFilterData;
  onSelected(): void;
  onDeleted(): void;
}> = ({ filter, onSelected, onDeleted }) => {
  let dateFrom = <></>;
  if (filter.dates.from) {
    dateFrom = <Text>From: {filter.dates.from.toString()}</Text>;
  }
  let dateTo = <></>;
  if (filter.dates.to) {
    dateTo = <Text>To: {filter.dates.to.toString()}</Text>;
  }
  let payments = <></>;
  if (filter.payments.length) {
    payments = (
      <Text>
        Payments:
        <>
          {filter.payments.map((p, i) => (
            <Chip key={i} label={p} />
          ))}
        </>
      </Text>
    );
  }
  const tags = <></>;
  if (filter.tags.length) {
    payments = (
      <Text>
        Tags:
        <>
          {filter.tags.map((t, i) => (
            <Chip key={i} label={t} />
          ))}
        </>
      </Text>
    );
  }
  let search = <></>;
  if (filter.search) {
    search = <Text>search: {filter.search}</Text>;
  }
  return (
    <Container>
      <Title>{filter.name}</Title>
      <Divider />
      {dateFrom}
      {dateTo}
      {payments}
      {tags}
      {search}
      <Actions onSelected={onSelected} onDeleted={onDeleted} />
    </Container>
  );
};

const Actions: React.FC<{
  onSelected(): void;
  onDeleted(): void;
}> = ({ onSelected, onDeleted }) => {
  return (
    <ActionsContainer>
      <Button
        variant="contained"
        onClick={() => {
          onSelected();
        }}
      >
        Use
      </Button>
      <Button
        color={"error"}
        variant="contained"
        onClick={() => {
          onDeleted();
        }}
      >
        Delete
      </Button>
    </ActionsContainer>
  );
};
