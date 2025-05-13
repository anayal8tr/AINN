import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (spotId) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ spotId, reviewData }) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to create review');
    return response.json();
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete review');
    return reviewId;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: {},
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
        // Convert array to object with IDs as keys
        state.reviews = action.payload.reduce((obj, review) => {
          obj[review.id] = review;
          return obj;
        }, {});
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create review cases
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews[action.payload.id] = action.payload;
      })
      // Delete review cases
      .addCase(deleteReview.fulfilled, (state, action) => {
        delete state.reviews[action.payload];
      });
  },
});

export default reviewsSlice.reducer; 