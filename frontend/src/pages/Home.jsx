import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../store/spots';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => state.spots.allSpots ? Object.values(state.spots.allSpots) : []);
  const status = useSelector(state => state.spots.status);
  const error = useSelector(state => state.spots.error);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const handleSpotClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing places...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchSpots())}>Try Again</button>
      </div>
    );
  }

  if (!spots.length) {
    return (
      <div className="empty-container">
        <p>No spots available at the moment.</p>
        <button onClick={() => dispatch(fetchSpots())}>Refresh Spots</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="spots-grid">
        {spots.map(spot => (
          <div
            key={spot.id}
            className="spot-card"
            onClick={() => handleSpotClick(spot.id)}
          >
            <div className="spot-image-container">
              <img
                src={spot.previewImage || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={spot.name}
                className="spot-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
            </div>
            <div className="spot-info">
              <div className="spot-header">
                <h3 className="spot-location">{spot.city}, {spot.state}</h3>
                <div className="spot-rating">
                  <i className="fas fa-star"></i>
                  <span>{spot.aveReview ? Number(spot.aveReview).toFixed(1) : 'New'}</span>
                </div>
              </div>
              <p className="spot-price">
                <span className="price-amount">${spot.price}</span> night
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 