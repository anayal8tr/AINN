import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { restoreUser } from './store/session';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SpotDetails from './pages/SpotDetails';
import CreateSpot from './pages/CreateSpot';
import EditSpot from './pages/EditSpot';
// import './index.css';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log ('Layout component rendered');
 useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navbar isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/spots/new', element: <CreateSpot />
      },
      {
        path: '/spots/:spotId', element: <SpotDetails />
      },
      {
        path: '/spots/current', element: <CurrentSpots />
      },
      {
        path: '/spots/:spotId/edit', element: <EditSpot />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
