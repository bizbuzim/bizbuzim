import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import { ApolloProvider, useQuery } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import _ from "lodash";

import { GET_ALL_EXPENSES } from "./queries/get-all-expenses";
import client from "./services/gql";
import { Sidebar } from "./components/sidebar";
import { Login } from "./components/login";
import { Filters } from "./views/filters";
import { Divider } from "./components/divider";
import { Auth0ClientId, Auth0Domain } from "./config";
import { Router } from "./components/router";
import { Expense } from "./views/expenses/types";
import { ExpensesContext } from "./context/expenses";

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
  return (
    <Container className="app">
      <Auth0Provider
        domain={Auth0Domain || ""}
        clientId={Auth0ClientId || ""}
        redirectUri={window.location.origin}
      >
        <Login />
        <ApolloProvider client={client}>
          <Application />
        </ApolloProvider>
      </Auth0Provider>
    </Container>
  );
}

const Application = () => {
  const [dateFrom, setDateFrom] = useState<Date>(new Date("2022-03-01"));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const { loading, error, data } = useQuery<{
    expenses: Expense[];
  }>(GET_ALL_EXPENSES, {
    variables: {
      from: dateFrom,
      to: dateTo,
    },
  });
  return (
    <ExpensesContext.Provider
      value={{
        isLoading: loading,
        error: error?.message,
        expenses: data?.expenses || [],
        tags: _.chain(data?.expenses)
          .map((e) => e.tags)
          .flattenDeep()
          .uniq()
          .value(),
      }}
    >
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
        <Router />
      </MainContainer>
    </ExpensesContext.Provider>
  );
};

export default App;
