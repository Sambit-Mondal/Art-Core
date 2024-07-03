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
import Chatbot from './Components/Chatbot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /><Chatbot /></>
  },
  {
    path: '/about',
    element: <><Navbar /><About /><Chatbot /></>
  },
  {
    path: '/artworks',
    element: <><Navbar /><Artworks /><Chatbot /></>
  },
  {
    path: '/contact',
    element: <><Navbar /><ContactMe /><Chatbot /></>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);


reportWebVitals();