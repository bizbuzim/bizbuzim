import React from "react";
import styled from "styled-components";

const DividerStyle = styled.hr`
  border-top: 1px solid #bbb;
`;

export const Divider: React.FC = () => {
  return <DividerStyle />;
};
