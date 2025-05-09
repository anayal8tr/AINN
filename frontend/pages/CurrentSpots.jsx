import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentUserSpots, deleteSpot } from '../store/spots';
import './CurrentSpots.css';

const CurrentSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  const status = useSelector(state => state.spots.status);
  const error = useSelector(state => state.spots.error);

  useEffect(() => {
    dispatch(fetchCurrentUserSpots());
  }, [dispatch]);

  const spotsList = useMemo(() => {
    return Object.values(spots).map(spot => ({
      ...spot,
      avgRating: spot.avgRating || 'New',
      previewImage: spot.previewImage || 'https://via.placeholder.com/300x200?text=No+Image'
    }));
  }, [spots]);

  const handleDelete = async (spotId) => {
    if (window.confirm('Are you sure you want to delete this spot?')) {
      await dispatch(deleteSpot(spotId));
      dispatch(fetchCurrentUserSpots());
    }
  };

  if (status === 'loading') {
    return <div className="loading">Loading your spots...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!spotsList.length) {
    return (
      <div className="no-spots">
        <h2>You haven't listed any spots yet!</h2>
        <Link to="/spots/new" className="create-spot-button">Create a New Spot</Link>
      </div>
    );
  }

  return (
    <div className="current-spots-container">
      <h1>Manage Your Spots</h1>
      <div className="spots-grid">
        {spotsList.map(spot => (
          <div key={spot.id} className="spot-card">
            <Link to={`/spots/${spot.id}`} className="spot-link">
              <img 
                src={spot.previewImage} 
                alt={spot.name}
                className="spot-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="spot-info">
                <div className="spot-header">
                  <h3>{spot.name}</h3>
                  <p className="rating">
                    <i className="fas fa-star"></i>
                    {typeof spot.avgRating === 'number' ? spot.avgRating.toFixed(1) : spot.avgRating}
                  </p>
                </div>
                <p className="location">{spot.city}, {spot.state}</p>
                <p className="price"><span>${spot.price}</span> night</p>
              </div>
            </Link>
            <div className="spot-actions">
              <Link to={`/spots/${spot.id}/edit`} className="edit-button">
                Update
              </Link>
              <button 
                onClick={() => handleDelete(spot.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentSpots; 