import { createSlice } from '@reduxjs/toolkit';
import { getCSRFToken, restoreCSRF } from '../utils/csrf';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    removeUser: (state) => {
      state.user = null;
      state.status = 'idle';
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

export const { setUser, removeUser, setError, setLoading } = sessionSlice.actions;

// Thunks
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await fetch("api/session", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': csrfToken
      },
      body: JSON.stringify({
        credential: credentials.email || credentials.credential,
        password: credentials.password
      }),
      credentials: 'include'
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    
    dispatch(setUser(data.user));
  } catch (error) {
    console.error('Login error:', error);
    dispatch(setError(error.message));
    throw error;
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    // First get CSRF token
    const csrfToken = await restoreCSRF();
    
    const response = await fetch("api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': csrfToken
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign up');
    }
    
    dispatch(setUser(data.user));
  } catch (error) {
    console.error('Signup error:', error);
    dispatch(setError(error.message));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    // First get CSRF token
    const csrfToken = await restoreCSRF();
    
    const response = await fetch("api/session", {
      method: 'DELETE',
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
    
    dispatch(removeUser());
  } catch (error) {
    console.error('Logout error:', error);
    dispatch(setError(error.message));
    throw error;
  }
};

export const restoreUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    // First get CSRF token
    const csrfToken = await restoreCSRF();
    
    const response = await fetch("api/session", {
      headers: {
        'XSRF-Token': csrfToken
      },
      credentials: 'include'
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to restore session');
    }
    
    if (data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(removeUser());
    }
  } catch (error) {
    console.error('Restore session error:', error);
    dispatch(removeUser());
  }
};

export default sessionSlice.reducer; 