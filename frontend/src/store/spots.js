import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL as BASE_URL } from '../config';
import { restoreCSRF, getCSRFToken } from '../utils/csrf';

const initialState = {
  allSpots: {},
  singleSpot: null,
  status: 'idle',
  error: null
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {
    setAllSpots: (state, action) => {
      const spotsObj = {};
      action.payload.Spots.forEach(spot => {
        spotsObj[spot.id] = {
          ...spot,
          avgRating: spot.avgRating || 0,
          previewImage: spot.previewImage || null
        };
      });
      state.allSpots = spotsObj;
      state.status = 'succeeded';
      state.error = null;
    },
    setSingleSpot: (state, action) => {
      state.singleSpot = {
        ...action.payload,
        avgRating: action.payload.avgRating || 0,
        previewImage: action.payload.previewImage || null,
        images: action.payload.images || []
      };
      state.status = 'succeeded';
      state.error = null;
    },
    addSpot: (state, action) => {
      const spot = {
        ...action.payload,
        avgRating: action.payload.avgRating || 0,
        previewImage: action.payload.previewImage || null
      };
      state.allSpots[spot.id] = spot;
      state.singleSpot = spot;
      state.status = 'succeeded';
      state.error = null;
    },
    updateSpot: (state, action) => {
      const spot = {
        ...action.payload,
        avgRating: action.payload.avgRating || 0,
        previewImage: action.payload.previewImage || null
      };
      state.allSpots[spot.id] = spot;
      state.singleSpot = spot;
      state.status = 'succeeded';
      state.error = null;
    },
    removeSpot: (state, action) => {
      delete state.allSpots[action.payload];
      if (state.singleSpot?.id === action.payload) {
        state.singleSpot = null;
      }
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
  setAllSpots,
  setSingleSpot,
  addSpot,
  updateSpot,
  removeSpot,
  setError,
  setLoading
} = spotsSlice.actions;

// Thunks
export const fetchSpots = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await restoreCSRF();
    const csrfToken = getCSRFToken();
    
    const response = await fetch(`/api/spots`, {
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch spots');
    }
    
    const data = await response.json();
    dispatch(setAllSpots(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchCurrentUserSpots = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await restoreCSRF();
    const csrfToken = getCSRFToken();
    
    const response = await fetch(`${BASE_URL}/spots/current`, {
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch your spots');
    }

    const data = await response.json();
    dispatch(setAllSpots(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchSpotById = (id) => async (dispatch) => {
  try {
    const spotId = parseInt(id);
    if (isNaN(spotId) || spotId <= 0) {
      throw new Error('Invalid spot ID');
    }

    dispatch(setLoading());
    await restoreCSRF();
    const csrfToken = getCSRFToken();

    const response = await fetch(`${BASE_URL}/spots/${spotId}`, {
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch spot');
    }

    const data = await response.json();
    dispatch(setSingleSpot(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createSpot = (spotData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/spots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create spot');
    }
    dispatch(addSpot(data));
    return data;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const updateSpotById = ({ id, ...spotData }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/spots/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update spot');
    }
    dispatch(updateSpot(data));
    return data;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const deleteSpot = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${BASE_URL}/spots/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Failed to delete spot');
    }
    dispatch(removeSpot(id));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const addSpotImage = (spotId, imageData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await restoreCSRF();
    const csrfToken = getCSRFToken();
    
    const response = await fetch(`${BASE_URL}/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': csrfToken
      },
      body: JSON.stringify(imageData),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add image');
    }

    // After adding the image, fetch the updated spot
    dispatch(fetchSpotById(spotId));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default spotsSlice.reducer; 