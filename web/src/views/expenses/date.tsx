import { DateTime } from "luxon";
import React, { useMemo } from "react";
import styled from "styled-components";

import { CalculateAge } from "./age";
import { StyledTD } from "./styles";

const Container = styled(StyledTD)`
  flex-direction: column;
  align-items: center;
`;

const AgeContainer = styled.div``;
const DateContainer = styled.div``;

export const DateTD: React.FC<{ date: string; now?: DateTime }> = ({
  date,
  now = DateTime.local(),
}) => {
  const d = DateTime.fromISO(date);
  const age = useMemo(() => {
    return CalculateAge(d, now);
  }, [d, now]);

  return (
    <Container style={{ flex: 3 }}>
      <AgeContainer>{age}</AgeContainer>
      <DateContainer>{d.toFormat("dd/MM/yyyy HH:MM")}</DateContainer>
    </Container>
  );
};

export default DateTD;
