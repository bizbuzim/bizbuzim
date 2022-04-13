import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";

import client from "./services/gql";
import { Sidebar } from "./components/sidebar";
import { Router } from "./components/router";
import { Login } from "./components/login";
import { Filters } from "./views/filters";
import { Divider } from "./components/divider";
import { Auth0ClientId, Auth0Domain } from "./config";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header header header header header header header"
    "menu filter filter filter filter filter filter filter"
    "menu main main main main main main main"
    "menu main main main main main main main"
    "menu main main main main main main main"
    "menu main main main main main main main";
  height: 100vh;
`;

const HeaderContainer = styled.div`
  grid-area: header;
  height: 5vh;
`;
const FiltersContainer = styled.div`
  grid-area: filter;
  height: 10vh;
`;
const MenuContainer = styled.div`
  grid-area: menu;
  height: 95rvh;
`;
const MainContainer = styled.div`
  grid-area: main;
  height: 85vh;
  overflow: scroll;
`;

function App() {
  const [dateFrom, setDateFrom] = useState<Date>(new Date("2022-03-01"));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  return (
    <Container className="app">
      <Auth0Provider
        domain={Auth0Domain || ""}
        clientId={Auth0ClientId || ""}
        redirectUri={window.location.origin}
      >
        <Login />
        <ApolloProvider client={client}>
          <HeaderContainer>header</HeaderContainer>
          <MenuContainer>
            <Sidebar />
          </MenuContainer>
          <FiltersContainer>
            <Filters
              fromDate={dateFrom}
              toDate={dateTo}
              fromDateChange={setDateFrom}
              toDateChange={setDateTo}
            />
            <Divider />
          </FiltersContainer>
          <MainContainer>
            <Router dateFrom={dateFrom} dateTo={dateTo} />
          </MainContainer>
        </ApolloProvider>
      </Auth0Provider>
    </Container>
  );
}

export default App;
