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
import PaintingPage from './Components/PaintingPage';
import AddArtworks from './Screens/AddArtworks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <div className='select-none flex flex-col justify-center items-center z-40 bg-opacity-10 w-screen h-screen bg-black'>
        <Router>
          <Routes>
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/about" element={<><Navbar /><About /></>} />
            <Route path="/artworks" element={<PrivateRoute element={<><Navbar /><Artworks /></>} />} />
            <Route path="/contact" element={<PrivateRoute element={<><Navbar /><ContactMe /></>} />} />
            <Route path="/login" element={<><Navbar /><LoginPopup loginVisibility={() => { }} /></>} />
            <Route path="/signup" element={<><Navbar /><LoginPopup loginVisibility={() => { }} /></>} />
            <Route path='/add-artworks' element={<PrivateRoute element={<><Navbar /><AddArtworks /></>} />} />
            <Route path="/painting-page" element={<><Navbar /><PaintingPage /></>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();