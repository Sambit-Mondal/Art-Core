// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import About from './Screens/About';
import Artworks from './Screens/Artworks';
import ContactMe from './Screens/ContactMe';
import Navbar from './Components/Navbar';
import LoginPopup from './Components/LoginPopup';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <div className='select-none flex flex-col justify-center items-center z-40 absolute top-0 bottom-0 left-0 right-0 bg-opacity-10 bg-black'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/artworks" element={<PrivateRoute element={<Artworks />} />} />
          <Route path="/contact" element={<PrivateRoute element={<ContactMe />} />} />
          <Route path="/login" element={<LoginPopup loginVisibility={() => {}} />} />
          <Route path="/signup" element={<LoginPopup loginVisibility={() => {}} />} />
        </Routes>
      </Router>
      </div>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();