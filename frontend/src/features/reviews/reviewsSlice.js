import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (spotId) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
  }
);

// Thunk for creating a review
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ spotId, rating, content }) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, content }),
    });
    if (!response.ok) {
      throw new Error('Failed to create review');
    }
    return response.json();
  }
);

// Thunk for deleting a review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete review');
    }
    return reviewId;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch reviews cases
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create review cases
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      // Delete review cases
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      });
  },
});

export default reviewsSlice.reducer;

// Selectors
export const selectAllReviews = (state) => state.reviews.reviews;
export const selectStatus = (state) => state.reviews.status;
export const selectError = (state) => state.reviews.error; 