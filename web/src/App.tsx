import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import { Provider } from "urql";
import _ from "lodash";
import { Auth0Provider } from "@auth0/auth0-react";
import { Chance } from "chance";
import { InfinitySpin } from "react-loader-spinner";
import { Divider } from "@mui/material";
import { DateTime } from "luxon";

import { useGetAllExpensesQuery } from "./generated/graphql";
import createClient from "./services/gql";
import { Sidebar } from "./components/sidebar";
import { Login } from "./components/login";
import { Filters } from "./views/filters";
import { Auth0ClientId, Auth0Domain } from "./config";
import { Router } from "./components/router";
import { ExpensesContext } from "./context/expenses";
import { FiltersContext } from "./context/filters";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
  background-color: #f1f5f9;
`;

const FiltersContainer = styled.div`
  grid-area: filter;
  height: 10vh;
  grid-area: 1 / 2 / 2 / 13;
  display: flex;
  justify-content: space-evenly;
`;
const MenuContainer = styled.div`
  height: 100vh;
  grid-area: 1 / 1 / 13 / 2;
`;
const MainContainer = styled.div`
  grid-area: 2 / 2 / 13 / 13;
  height: 90vh;
  overflow: scroll;
`;

const LoaderContainer = styled.div`
  display: flex;
`;

function App() {
  const [token, setToken] = useState("");
  let application = (
    <LoaderContainer>
      <InfinitySpin width="100%" color="grey" />
    </LoaderContainer>
  );
  if (token) {
    application = (
      <Provider value={createClient({ token })}>
        <Application />
      </Provider>
    );
  }
  return (
    <Container className="app">
      <Auth0Provider
        domain={Auth0Domain || ""}
        clientId={Auth0ClientId || ""}
        redirectUri={window.location.origin}
      >
        <Login onJWTReceived={setToken} />
        {application}
      </Auth0Provider>
    </Container>
  );
}

const Application = () => {
  const [dateFrom, setDateFrom] = useState<DateTime>(
    DateTime.local().minus({ days: 30 })
  );
  const [dateTo, setDateTo] = useState<DateTime>(DateTime.local());
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState<string[]>([]);
  const [result] = useGetAllExpensesQuery({
    variables: {
      from: dateFrom,
      to: dateTo,
    },
  });
  const { data, error, fetching } = result;

  const chance = new Chance();
  const t = _.chain(data?.expenses)
    .map((e) => e.tags)
    .flattenDeep()
    .uniq()
    .compact()
    .map((t) => {
      return {
        name: t,
        color: chance.color({ format: "hex" }),
      };
    })
    .value();

  const p = _.chain(data?.expenses)
    .map((e) => e.payment)
    .uniq()
    .compact()
    .value();

  return (
    <FiltersContext.Provider
      value={{
        dates: {
          from: dateFrom,
          to: dateTo,
        },
        tags,
        search,
        payments,
      }}
    >
      <ExpensesContext.Provider
        value={{
          expenses: data?.expenses || [],
          isLoading: fetching,
          error: error?.message,
          tags: t,
          payments: p,
        }}
      >
        <MenuContainer>
          <Sidebar />
        </MenuContainer>
        <FiltersContainer>
          <Filters
            fromDate={dateFrom}
            toDate={dateTo}
            fromDateChange={setDateFrom}
            toDateChange={setDateTo}
            tagsSelected={setTags}
            searchChange={setSearch}
            paymentsSelected={setPayments}
          />
          <Divider style={{ paddingTop: "20px" }} />
        </FiltersContainer>
        <MainContainer>
          <Router />
        </MainContainer>
      </ExpensesContext.Provider>
    </FiltersContext.Provider>
  );
};

export default App;
