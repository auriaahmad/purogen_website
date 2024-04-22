// routes.js
import Dashboard from '../Components/Dashboard/Dashboard';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  }
];

export default createBrowserRouter(routes);
