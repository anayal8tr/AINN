import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL as BASE_URL } from '../config';

const initialState = {
  spotReviews: {},
  userReviews: {},
  status: 'idle',
  error: null
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setSpotReviews: (state, action) => {
      const reviewsObj = {};
      action.payload.forEach(review => {
        reviewsObj[review.id] = review;
      });
      state.spotReviews = reviewsObj;
      state.status = 'succeeded';
      state.error = null;
    },
    setUserReviews: (state, action) => {
      const reviewsObj = {};
      action.payload.forEach(review => {
        reviewsObj[review.id] = review;
      });
      state.userReviews = reviewsObj;
      state.status = 'succeeded';
      state.error = null;
    },
    addReview: (state, action) => {
      state.spotReviews[action.payload.id] = action.payload;
      if (action.payload.userId === state.currentUserId) {
        state.userReviews[action.payload.id] = action.payload;
      }
      state.status = 'succeeded';
      state.error = null;
    },
    removeReview: (state, action) => {
      delete state.spotReviews[action.payload];
      delete state.userReviews[action.payload];
      state.status = 'succeeded';
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading: (state) => {
      state.status = 'loading';
    }
  }
});

export const {
  setSpotReviews,
  setUserReviews,
  addReview,
  removeReview,
  setError,
  setLoading
} = reviewsSlice.actions;

// Thunks
export const fetchSpotReviews = (spotId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/spots/${spotId}/reviews`, {
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch reviews');
    }
    dispatch(setSpotReviews(data.reviews));
    dispatch(setLoading());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading());
  }
};

export const fetchUserReviews = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/reviews/current`, {
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user reviews');
    }
    dispatch(setUserReviews(data.reviews));
    dispatch(setLoading());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading());
  }
};

export const createReview = (spotId, reviewData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create review');
    }
    dispatch(addReview(data));
    dispatch(setLoading());
    return data;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading());
    throw error;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Failed to delete review');
    }
    dispatch(removeReview(reviewId));
    dispatch(setLoading());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading());
    throw error;
  }
};

export default reviewsSlice.reducer; 