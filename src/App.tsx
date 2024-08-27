import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage'
import MemberPage from './pages/MemberPage'
import BoardPage from './pages/BoardPage';
import OrderPage from './pages/OrderPage';
import CourtPage from './pages/CourtPage';
import ResultPage from './pages/ResultPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="Member" element={<MemberPage />} />
          <Route path="Board" element={<BoardPage />} />
          <Route path="Order" element={<OrderPage />} />
          <Route path="Court" element={<CourtPage />} />
          <Route path="Result" element={<ResultPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
