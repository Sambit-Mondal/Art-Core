import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Screens/Home';
import About from './Screens/About';
import Artworks from './Screens/Artworks';
import ContactMe from './Screens/ContactMe';
import Navbar from './Components/Navbar';
import LoginPopup from './Components/LoginPopup';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Home />
      </>
    )
  },
  {
    path: '/about',
    element: (
      <>
        <Navbar />
        <About />
      </>
    )
  },
  {
    path: '/artworks',
    element: (
      <>
        <Navbar />
        <Artworks />
      </>
    )
  },
  {
    path: '/contact',
    element: (
      <>
        <Navbar />
        <ContactMe />
      </>
    )
  },
  {
    path: '/login',
    element: (
      <>
        <LoginPopup loginVisibility={() => {}} />
      </>
    )
  },
  {
    path: '/signup',
    element: (
      <>
        <LoginPopup loginVisibility={() => {}} />
      </>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();