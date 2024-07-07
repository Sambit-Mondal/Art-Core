import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;