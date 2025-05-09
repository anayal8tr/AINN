import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for spots
export const fetchSpots = createAsyncThunk(
  'spots/fetchSpots',
  async () => {
    const response = await fetch('/api/spots');
    if (!response.ok) throw new Error('Failed to fetch spots');
    return response.json();
  }
);

export const fetchSpotById = createAsyncThunk(
  'spots/fetchSpotById',
  async (spotId) => {
    const response = await fetch(`/api/spots/${spotId}`);
    if (!response.ok) throw new Error('Failed to fetch spot');
    return response.json();
  }
);

export const createSpot = createAsyncThunk(
  'spots/createSpot',
  async (spotData) => {
    const response = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData),
    });
    if (!response.ok) throw new Error('Failed to create spot');
    return response.json();
  }
);

export const updateSpot = createAsyncThunk(
  'spots/updateSpot',
  async ({ spotId, spotData }) => {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData),
    });
    if (!response.ok) throw new Error('Failed to update spot');
    return response.json();
  }
);

export const deleteSpot = createAsyncThunk(
  'spots/deleteSpot',
  async (spotId) => {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete spot');
    return spotId;
  }
);

const spotsSlice = createSlice({
  name: 'spots',
  initialState: {
    allSpots: {},
    currentSpot: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all spots cases
      .addCase(fetchSpots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Convert array to object with IDs as keys
        state.allSpots = action.payload.reduce((obj, spot) => {
          obj[spot.id] = spot;
          return obj;
        }, {});
      })
      .addCase(fetchSpots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch single spot cases
      .addCase(fetchSpotById.fulfilled, (state, action) => {
        state.currentSpot = action.payload;
      })
      // Create spot cases
      .addCase(createSpot.fulfilled, (state, action) => {
        state.allSpots[action.payload.id] = action.payload;
      })
      // Update spot cases
      .addCase(updateSpot.fulfilled, (state, action) => {
        state.allSpots[action.payload.id] = action.payload;
        if (state.currentSpot?.id === action.payload.id) {
          state.currentSpot = action.payload;
        }
      })
      // Delete spot cases
      .addCase(deleteSpot.fulfilled, (state, action) => {
        delete state.allSpots[action.payload];
        if (state.currentSpot?.id === action.payload) {
          state.currentSpot = null;
        }
      });
  },
});

export default spotsSlice.reducer; 