import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage'
import MemberPage from './components/MemberPage'
import BoardPage from './components/BoardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="member" element={<MemberPage />} />
          <Route path="board" element={<BoardPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
