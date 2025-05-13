import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL as BASE_URL } from '../config';
import { restoreCSRF } from '../utils/csrf';

const initialState = {
  userBookings: [],
  spotBookings: {},
  status: 'idle',
  error: null
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setSpotBookings: (state, action) => {
      const { spotId, bookings } = action.payload;
      state.spotBookings[spotId] = bookings;
      state.status = 'succeeded';
      state.error = null;
    },
    addBooking: (state, action) => {
      state.userBookings.push(action.payload);
      const spotId = action.payload.spotId;
      if (state.spotBookings[spotId]) {
        state.spotBookings[spotId].push(action.payload);
      }
      state.status = 'succeeded';
      state.error = null;
    },
    removeBooking: (state, action) => {
      const bookingId = action.payload;
      state.userBookings = state.userBookings.filter(booking => booking.id !== bookingId);
      Object.keys(state.spotBookings).forEach(spotId => {
        state.spotBookings[spotId] = state.spotBookings[spotId].filter(
          booking => booking.id !== bookingId
        );
      });
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
  setUserBookings,
  setSpotBookings,
  addBooking,
  removeBooking,
  setError,
  setLoading
} = bookingsSlice.actions;

// Thunks
export const fetchUserBookings = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    const csrfToken = await restoreCSRF();
    
    const response = await fetch(`${BASE_URL}/bookings/current`, {
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user bookings');
    }
    
    const data = await response.json();
    dispatch(setUserBookings(data.Bookings));
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    dispatch(setError(error.message));
  }
};

export const fetchSpotBookings = (spotId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    const csrfToken = await restoreCSRF();
    
    const response = await fetch(`${BASE_URL}/spots/${spotId}/bookings`, {
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch spot bookings');
    }
    
    const data = await response.json();
    dispatch(setSpotBookings({ spotId, bookings: data.Bookings }));
  } catch (error) {
    console.error('Error fetching spot bookings:', error);
    dispatch(setError(error.message));
  }
};

export const createBooking = (spotId, bookingData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    const csrfToken = await restoreCSRF();
    
    const response = await fetch(`${BASE_URL}/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': csrfToken
      },
      body: JSON.stringify(bookingData),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create booking');
    }
    
    const data = await response.json();
    dispatch(addBooking(data));
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    dispatch(setError(error.message));
    throw error;
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    const csrfToken = await restoreCSRF();
    
    const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete booking');
    }
    
    dispatch(removeBooking(bookingId));
  } catch (error) {
    console.error('Error deleting booking:', error);
    dispatch(setError(error.message));
    throw error;
  }
};

export default bookingsSlice.reducer; 