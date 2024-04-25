import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import Login from '../Components/Login/Login';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },
  {
    path: '*',
    element: <div><h1>page not found</h1></div>
  },
]);

export default routes;