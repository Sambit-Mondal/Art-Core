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
import PaintingDetails from './Screens/PaintingDetails';
import AddArtworks from './Screens/AddArtworks';
import { ArtworksProvider } from './context/ArtworksContext'; // Import the provider
import UserAddress from './Components/UserAddress';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ArtworksProvider>
        <Router>
          <div className='select-none flex flex-col justify-center items-center z-40 bg-opacity-10 h-screen bg-black'>
            <Routes>
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/about" element={<><Navbar /><About /></>} />
              <Route path="/artworks" element={<PrivateRoute element={<><Navbar /><Artworks /></>} />} />
              <Route path="/contact" element={<PrivateRoute element={<><Navbar /><ContactMe /></>} />} />
              <Route path="/login" element={<><Navbar /><LoginPopup loginVisibility={() => { }} /></>} />
              <Route path="/signup" element={<><Navbar /><LoginPopup loginVisibility={() => { }} /></>} />
              <Route path='/add-artworks' element={<PrivateRoute element={<><Navbar /><AddArtworks /></>} />} />
              <Route path="/painting-details/:id" element={<><Navbar /><PaintingDetails /></>} />
              <Route path='/user-address' element={<><Navbar /><UserAddress /></>} />
            </Routes>
          </div>
        </Router>
      </ArtworksProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();