
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalStore } from '../store/index';

const PrivateRoute = ({ children }) => {
  const user = useGlobalStore((state) => state.user);
  if (user && user.type === 'company') {
    return children;
  } else {
    return <Navigate to='/signin' />;
    console.log("here");
  }
};

export default PrivateRoute;
