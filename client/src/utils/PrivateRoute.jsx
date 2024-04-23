// // ProtectedRoute.js
// import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ element: Element, ...rest }) => { // Change component to element
//     const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

//     return (
//         <Routes>
//             <Route
//                 {...rest}
//                 element={isAuthenticated ? <Element /> : <Navigate to="/" replace={true} />}
//             />
//         </Routes>
//     );
// };

// export default ProtectedRoute;

// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalStore } from '../store/index';

const PrivateRoute = ({ children }) => {
  const user = useGlobalStore((state) => state.user);
  if (user && user.type === 'company') {
    return children;
  } else {
    return <Navigate to='/signin' />;
  }
};

export default PrivateRoute;
