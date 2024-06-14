import { createBrowserRouter } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Dashboard from '../Components/Dashboard/Dashboard';
import PrivateRoute from './privateRoutes';
import NotFound from '../Components/NotFound/NotFound';
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
    element: <NotFound />
  },
]);

export default routes;
