import React from "react";
import styled from "styled-components";

import { StyledTD } from "./styles";

const Container = styled(StyledTD)`
  flex-direction: column;
  align-items: center;
`;

const CurrencyTD: React.FC<{ price: string }> = ({ price }) => {
  return <Container style={{ flex: 3 }}>{price}</Container>;
};

export default CurrencyTD;
