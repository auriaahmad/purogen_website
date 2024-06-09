import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/store';

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const token = useUserStore((state) => state.token);

    useEffect(() => {
        // Check if token is available after user store is initialized
        if (token !== null) {
            setLoading(false);
        } else {
            // If no token is available, stop loading and redirect to login
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        // Render loading indicator while user store is initializing
        return <div>Loading...</div>;
    }

    // Once loading is complete, determine whether to render children or redirect
    if (token) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;