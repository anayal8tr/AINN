import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserBookings, deleteBooking } from '../store/bookings';
import './UserBookings.css';

const UserBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector(state => state.bookings.userBookings);
  const status = useSelector(state => state.bookings.status);
  const error = useSelector(state => state.bookings.error);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchUserBookings());
  }, [dispatch, user, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await dispatch(deleteBooking(bookingId));
      } catch (error) {
        console.error('Failed to cancel booking:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchUserBookings())}>Try Again</button>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="no-bookings">
        <h2>No Bookings Yet</h2>
        <p>When you book a place, it will appear here.</p>
        <button onClick={() => navigate('/')}>Find a Place to Stay</button>
      </div>
    );
  }

  return (
    <div className="user-bookings">
      <h1>Your Trips</h1>
      <div className="bookings-grid">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <div className="booking-image">
              {booking.Spot?.SpotImages?.[0]?.url ? (
                <img 
                  src={booking.Spot.SpotImages[0].url} 
                  alt={booking.Spot.name}
                  onClick={() => navigate(`/spots/${booking.Spot.id}`)}
                />
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            
            <div className="booking-details">
              <h3 onClick={() => navigate(`/spots/${booking.Spot.id}`)}>
                {booking.Spot.name}
              </h3>
              <p className="booking-location">
                {booking.Spot.city}, {booking.Spot.state}
              </p>
              <div className="booking-dates">
                <p>
                  <strong>Check-in:</strong> {formatDate(booking.startDate)}
                </p>
                <p>
                  <strong>Checkout:</strong> {formatDate(booking.endDate)}
                </p>
              </div>
              <p className="booking-price">
                <strong>${booking.Spot.price}</strong> / night
              </p>
              
              {new Date(booking.startDate) > new Date() && (
                <button 
                  className="cancel-booking"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings; 