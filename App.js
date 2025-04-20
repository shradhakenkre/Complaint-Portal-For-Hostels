import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintList from './components/ComplaintList';
import ComplaintForm from './components/ComplaintForm';
import ComplaintDetailPage from './pages/ComplaintDetailPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints" element={<ComplaintList />} />
        <Route path="/create-complaint" element={<ComplaintForm />} />
        <Route path="/complaints/:id" element={<ComplaintDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
