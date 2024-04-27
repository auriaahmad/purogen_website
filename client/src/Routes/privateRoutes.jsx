import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useUserStore from '../store/store';

const PrivateRoute = ({ children}) => {
  const token = useUserStore((state) => state.token !== null);
    if (token){
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;