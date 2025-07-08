import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpotById, deleteSpot } from '../store/spots';
import { fetchSpotReviews } from '../store/reviews';
import SpotImageUpload from '../components/SpotImageUpload';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  
  const spot = useSelector(state => state.spots.singleSpot);
  const reviews = useSelector(state => Object.values(state.reviews.spotReviews));
  const currentUser = useSelector(state => state.session.user);
  const spotStatus = useSelector(state => state.spots.status);
  const bookings = useSelector(state => state.bookings.spotBookings[spotId] || []);
  const bookingError = useSelector(state => state.bookings.error);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotById(spotId));
    dispatch(fetchSpotReviews(spotId));
    dispatch(fetchSpotBookings(spotId));
  }, [dispatch, spotId]);

  const handleEdit = () => {
    navigate(`/spots/${spotId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteSpot(spotId));
      navigate('/');
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to make a booking');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    setIsBooking(true);
    try {
      await dispatch(createBooking(spotId, {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }));
      setBookingSuccess(true);
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsBooking(false);
    }
  };

  // Filter out dates that are already booked
  const excludeDates = bookings.map(booking => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const dates = [];
    let current = start;
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }).flat();

  const isOwner = currentUser && spot.ownerId === currentUser.id;

  if (spotStatus === 'loading' || !spot) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading spot details...</p>
      </div>
    );
  }

  return (
    <div className="spot-details-container">
      <div className="spot-header">
        <h1>{spot.name}</h1>
        <div className="spot-subheader">
          <div className="spot-rating">
            <i className="fas fa-star"></i>
            <span>{spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}</span>
          </div>
          <span className="dot">·</span>
          <span className="spot-location">{spot.city}, {spot.state}, {spot.country}</span>
          
          {isOwner && (
            <div className="owner-actions">
              <button onClick={handleEdit} className="edit-button">
                <i className="fas fa-edit"></i> Edit
              </button>
              <button 
                onClick={() => setShowConfirmDelete(true)} 
                className="delete-button"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="spot-images">
        {spot.SpotImages && spot.SpotImages.length > 0 ? (
          spot.SpotImages.map((image, index) => (
            <div 
              key={index} 
              className={`image-container ${index === 0 ? 'main-image' : 'secondary-image'}`}
            >
              <img src={image.url} alt={`${spot.name} - ${index + 1}`} />
            </div>
          ))
        ) : spot.previewImage ? (
          <div className="image-container main-image">
            <img src={spot.previewImage} alt={spot.name} />
          </div>
        ) : (
          <div className="image-container main-image">
            <div className="no-image">No images available</div>
          </div>
        )}
      </div>

      {isOwner && (
        <SpotImageUpload 
          spotId={spotId} 
          onSuccess={() => {
            dispatch(fetchSpotById(spotId));
          }}
        />
      )}

      <div className="spot-content">
        <div className="spot-info">
          <div className="spot-description">
            <h2>About this place</h2>
            <p>{spot.description}</p>
          </div>
        </div>

        <div className="spot-booking">
          <div className="booking-card">
            <div className="price-info">
              <span className="price">${spot.price}</span>
              <span className="per-night">night</span>
            </div>
            <div className="rating-reviews">
              <div className="spot-rating">
                <i className="fas fa-star"></i>
                <span>{spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}</span>
              </div>
              <span className="dot">·</span>
              <span className="reviews-count">
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>

            {bookingError && (
              <div className="booking-error">
                <p>{bookingError}</p>
              </div>
            )}

            {bookingSuccess && (
              <div className="booking-success">
                <p>Booking successful! Check your bookings for details.</p>
              </div>
            )}

            <form onSubmit={handleBooking} className="booking-form">
              <div className="date-pickers">
                <div className="date-picker">
                  <label>CHECK-IN</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    excludeDates={excludeDates}
                    placeholderText="Select date"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
                <div className="date-picker">
                  <label>CHECKOUT</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    excludeDates={excludeDates}
                    placeholderText="Select date"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="reserve-button"
                disabled={isBooking || !currentUser || !startDate || !endDate}
              >
                {isBooking ? 'Reserving...' : 'Reserve'}
              </button>

              {!currentUser && (
                <p className="login-prompt">Please log in to make a reservation</p>
              )}

              {startDate && endDate && (
                <div className="price-breakdown">
                  <div className="price-item">
                    <span>${spot.price} × {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} nights</span>
                    <span>${spot.price * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="price-item">
                    <span>Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="price-item">
                    <span>Service fee</span>
                    <span>$30</span>
                  </div>
                  <div className="price-total">
                    <span>Total</span>
                    <span>
                      ${spot.price * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 80}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="spot-reviews">
        <h2>Reviews</h2>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <i className="fas fa-user-circle"></i>
                  <div>
                    <h3>{review.User.username}</h3>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="review-rating">
                  <i className="fas fa-star"></i>
                  <span>{review.stars}</span>
                </div>
              </div>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
        </div>
      </div>

      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="confirm-delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this spot? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowConfirmDelete(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotDetails; 