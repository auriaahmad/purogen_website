// // import React, { useState } from 'react'
// // import { Navigate } from 'react-router-dom';

// // const PrivateRoute = () => {
// //     const [loading,setLoading] = useState(true);
// //     const user = JSON.parse(localStorage.getItem('user'));


// // if(loading) {
// //     if(user) return </>;
// //     return (
// //         <div>
// //             <h1>Loading...</h1>
// //         </div>
// //     )
// // }

// // if(!user) return <Navigate to="/" />;

// //   return (
// //     <div>PrivateRoute</div>
// //   )
// // }

// // export default PrivateRoute

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };

// export default PrivateRoute;