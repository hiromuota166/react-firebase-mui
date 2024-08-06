import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage'
import MemberPage from './components/MemberPage'
import BoardPage from './components/BoardPage';
import GamePage from './components/GamePage';
import GPTPage from './components/GPTPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="Member" element={<MemberPage />} />
          <Route path="Board" element={<BoardPage />} />
          <Route path="Game" element={<GamePage />} />
          <Route path="GPT" element={<GPTPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
