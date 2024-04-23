// // store/reducers/authenticationReducer.js
// const initialState = {
//     isAuthenticated: false,
//     token: null,
//   };
  
//   const authenticationReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'LOGIN_SUCCESS':
//         return {
//           ...state,
//           isAuthenticated: true,
//           token: action.payload.token,
//         };
//       case 'LOGOUT':
//         return {
//           ...state,
//           isAuthenticated: false,
//           token: null,
//         };
//       case 'SAVE_AUTH_TOKEN':
//         return {
//           ...state,
//           token: action.payload.token,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default authenticationReducer;
  