import { createBrowserRouter } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Dashboard from '../Components/Dashboard/Dashboard';
import PrivateRoute from './privateRoutes';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: '*',
    element: <div><h1>Page not found</h1></div>
  },
]);

export default routes;
