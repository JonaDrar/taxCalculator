import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaxCalculator from '../components/TaxCalculator';
import History from '../components/History';
import Navigation from '../components/Navigation';
import DiagramPage from '../components/DiagramPage';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<TaxCalculator />} />
        <Route path="/history" element={<History />} />
        <Route path="/diagram" element={<DiagramPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;