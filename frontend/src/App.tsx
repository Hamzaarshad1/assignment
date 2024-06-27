import {
  HeaderComponent as Header,
  TableComponent as Table,
  Toast,
} from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context';
import { Details } from './container';

function App() {
  return (
    <DataProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/passenger/:passengerId" element={<Details />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
