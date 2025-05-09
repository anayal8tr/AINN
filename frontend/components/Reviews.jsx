import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { fetchReviews, createReview, deleteReview } from '../store/reviewsSlice';
import './Reviews.css';

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews.reviews));
  const user = useSelector(state => state.session.user);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await dispatch(createReview({
        spotId,
        reviewData: { rating, comment }
      })).unwrap();
      setShowReviewForm(false);
      setRating(5);
      setComment('');
    } catch (error) {
      setErrors([error.message || 'Failed to create review']);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
    } catch (error) {
      setErrors([error.message || 'Failed to delete review']);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'New';

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <div className="rating-summary">
          <i className="fas fa-star"></i>
          <span className="average-rating">{averageRating}</span>
          <span className="dot">·</span>
          <span className="review-count">{reviews.length} reviews</span>
        </div>

        {user && (
          <button 
            className="write-review-button"
            onClick={() => setShowReviewForm(true)}
          >
            Write a review
          </button>
        )}
      </div>

      {showReviewForm && (
        <form onSubmit={handleSubmit} className="review-form">
          {errors.length > 0 && (
            <div className="error-list">
              {errors.map((error, idx) => (
                <p key={idx} className="error">{error}</p>
              ))}
            </div>
          )}

          <div className="rating-input">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={star <= rating ? 'star active' : 'star'}
                  onClick={() => setRating(star)}
                >
                  <i className="fas fa-star"></i>
                </button>
              ))}
            </div>
          </div>

          <div className="comment-input">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              required
            />
          </div>

          <div className="form-buttons">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit review
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <img 
                  src={review.User?.profileImage || '/default-profile.png'} 
                  alt={review.User?.firstName}
                  className="reviewer-image"
                />
                <div className="reviewer-details">
                  <p className="reviewer-name">
                    {review.User?.firstName} {review.User?.lastName}
                  </p>
                  <p className="review-date">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              {user?.id === review.userId && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="delete-review-button"
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
            <div className="review-rating">
              <i className="fas fa-star"></i>
              <span>{review.rating}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews; 