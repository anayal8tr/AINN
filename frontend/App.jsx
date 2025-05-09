import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { restoreUser } from './store/session';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SpotDetails from './pages/SpotDetails';
import CreateSpot from './pages/CreateSpot';
import EditSpot from './pages/EditSpot';
import UserBookings from './pages/UserBookings';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/spots/new" element={<CreateSpot />} />
          <Route path="/spots/:spotId" element={<SpotDetails />} />
          <Route path="/spots/:spotId/edit" element={<EditSpot />} />
          <Route path="/bookings" element={<UserBookings />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
