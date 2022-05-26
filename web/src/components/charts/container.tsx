import styled from "styled-components";

export const ChartShadowContainer = styled.div<{
  width: string;
}>`
  width: ${(props) => props.width};
  position: relative;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.25);
  padding: 10px;
`;
