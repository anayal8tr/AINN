import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotsApi } from '../../utils/api';

// Thunks
export const fetchSpots = createAsyncThunk(
  'spots/fetchSpots',
  async () => {
    const spots = await spotsApi.getAll();
    return spots;
  }
);

export const fetchSpotById = createAsyncThunk(
  'spots/fetchSpotById',
  async (id) => {
    const spot = await spotsApi.getById(id);
    return spot;
  }
);

export const createSpot = createAsyncThunk(
  'spots/createSpot',
  async (spotData) => {
    const spot = await spotsApi.create(spotData);
    return spot;
  }
);

export const updateSpot = createAsyncThunk(
  'spots/updateSpot',
  async ({ id, spotData }) => {
    const spot = await spotsApi.update(id, spotData);
    return spot;
  }
);

export const deleteSpot = createAsyncThunk(
  'spots/deleteSpot',
  async (id) => {
    await spotsApi.delete(id);
    return id;
  }
);

const initialState = {
  spots: [],
  currentSpot: null,
  isLoading: false,
  error: null
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all spots
      .addCase(fetchSpots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.spots = action.payload;
      })
      .addCase(fetchSpots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch single spot
      .addCase(fetchSpotById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpotById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSpot = action.payload;
      })
      .addCase(fetchSpotById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Create spot
      .addCase(createSpot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSpot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.spots.push(action.payload);
      })
      .addCase(createSpot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update spot
      .addCase(updateSpot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSpot.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.spots.findIndex(spot => spot.id === action.payload.id);
        if (index !== -1) {
          state.spots[index] = action.payload;
        }
        state.currentSpot = action.payload;
      })
      .addCase(updateSpot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete spot
      .addCase(deleteSpot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSpot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.spots = state.spots.filter(spot => spot.id !== action.payload);
        if (state.currentSpot?.id === action.payload) {
          state.currentSpot = null;
        }
      })
      .addCase(deleteSpot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearError } = spotsSlice.actions;

export const spotsReducer = spotsSlice.reducer;

// Selectors
export const selectAllSpots = (state) => state.spots.spots;
export const selectCurrentSpot = (state) => state.spots.currentSpot;
export const selectIsLoading = (state) => state.spots.isLoading;
export const selectError = (state) => state.spots.error; 