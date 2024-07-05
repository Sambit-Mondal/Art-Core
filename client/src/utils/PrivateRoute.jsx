// PrivateRoute.jsx
import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginPopup from '../Components/LoginPopup';

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    return user ? element : <LoginPopup loginVisibility={() => {}} />;
};

export default PrivateRoute;