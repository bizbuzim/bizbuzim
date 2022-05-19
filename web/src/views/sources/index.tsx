import React from "react";
import styled from "styled-components";
import { BsTelegram } from "react-icons/bs";
import { Divider } from "@mui/material";

import { useFetchSourcesQuery } from "../../generated/graphql";

const Container = styled.div`
  display: flex;
  gap: "10px";
  justify-content: space-around;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  height: 15vh;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const Sources: React.FC = () => {
  const [result] = useFetchSourcesQuery();
  const { fetching, data, error } = result;
  if (error) {
    return <>{error.message}</>;
  }

  if (fetching) {
    return <>loading...</>;
  }

  const cards = data?.sources.map((source) => {
    return (
      <Card>
        <Title>
          <BsTelegram /> {source.name}
        </Title>
        <Divider />
        <br></br>
        <Content>{JSON.stringify(source)}</Content>
      </Card>
    );
  });

  return <Container>{cards}</Container>;
};

export default Sources;
