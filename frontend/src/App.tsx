import {
  HeaderComponent as Header,
  TableComponent as Table,
  Toast,
} from "./components";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context";
import { Details } from "./container";

function App() {
  return (
    <DataProvider>
      <Header />
      <Toast />
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/passengerId/:passengerId" element={<Details />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
