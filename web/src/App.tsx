import "./App.css";
import styled from "styled-components";
import { Sidebar } from "./components/sidebar";
import { Router } from "./components/router";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header header header header header header header"
    "menu main main main main main main main";
  height: 100vh;
`;

const HeaderContainer = styled.div`
  grid-area: header;
  height: 5vh;
`;
const MenuContainer = styled.div`
  grid-area: menu;
  height: 95vh;
`;

const MainContainer = styled.div`
  grid-area: main;
  height: 95vh;
`;

function App() {
  return (
    <Container className="app">
      <HeaderContainer>header</HeaderContainer>
      <MenuContainer>
        <Sidebar />
      </MenuContainer>
      <MainContainer>
        <Router />
      </MainContainer>
    </Container>
  );
}

export default App;
