import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import LoginPage from './components/LoginPage'; // imports from the components
import ListingPage from './components/ListingPage';
import UserPage from './components/UserPage';


function App() {
  return (

    <Router> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/user/:userName" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;


