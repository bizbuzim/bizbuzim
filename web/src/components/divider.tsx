import styled from "styled-components";

const DividerStyle = styled.hr`
  border-top: 2px solid #bbb;
  border-radius: 5px;
`;

export function Divider() {
  return <DividerStyle />;
}
