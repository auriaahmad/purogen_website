import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/routes';
import useUserStore from './store/store';
import { useEffect } from 'react';



function App() {
  const initializeUserStore = useUserStore((state) => state.initialize);
  useEffect(() => {
    initializeUserStore();
  }, [initializeUserStore]);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;