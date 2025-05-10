import logo from './logo.svg';
import './App.css';
import AuthPage from './components/Auth/AuthPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/login';
import PasswordResetConfirm from './components/Auth/PasswordResetConfirm';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset-confirm" element={<PasswordResetConfirm />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
