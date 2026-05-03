import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import LoginSignup from './pages/LoginSignup';
import ConfirmDetails from './pages/ConfirmDetails';
import LoanLimit from './pages/LoanLimit';
import Verification from './pages/Verification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/confirm" element={<ConfirmDetails />} />
        <Route path="/limit" element={<LoanLimit />} />
        <Route path="/verify" element={<Verification />} />
      </Routes>
    </Router>
  );
}

export default App;
