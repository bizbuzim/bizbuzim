import { DateTime } from "luxon";
import React, { useMemo } from "react";
import styled from "styled-components";

import { StyledTD } from "./styles";

const Container = styled(StyledTD)`
  flex-direction: column;
  align-items: center;
`;

const AgeContainer = styled.div``;
const DateContainer = styled.div``;

const DateTD: React.FC<{ date: string; now?: DateTime }> = ({
  date,
  now = DateTime.local(),
}) => {
  const d = DateTime.fromISO(date);
  const age = useMemo(() => {
    const diff = Math.ceil(d.diff(now, "days").as("days"));
    if (diff) {
      return diff * -1 + " days ago";
    }
    return "Today";
  }, [d]);

  return (
    <Container style={{ flex: 3 }}>
      <AgeContainer>{age}</AgeContainer>
      <DateContainer>{d.toFormat("dd/MM/yyyy HH:MM")}</DateContainer>
    </Container>
  );
};

export default DateTD;
