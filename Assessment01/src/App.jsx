import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import InvoiceDetail from './Components/InvoiceDetail';
import Register from './Components/RegisterUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />}/>
        <Route path="/main" element={<InvoiceDetail />} />
        <Route path="/Register" element={<Register />} /> {/* Redirects to login if no path */}
      </Routes>
    </Router>
  );
};

export default App;
