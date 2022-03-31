import "./App.css";
import styled from "styled-components";
import { Sidebar } from "./components/sidebar";
import { Router } from "./components/router";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <Container className="app">
      <Sidebar />
      <Router />
    </Container>
  );
}

export default App;
