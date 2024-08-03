import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage'
import MemberPage from './components/MemberPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="member" element={<MemberPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
