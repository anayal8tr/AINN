import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setUser, removeUser, setLoading, setError } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.session.user;
export const selectIsLoading = (state) => state.session.isLoading;
export const selectError = (state) => state.session.error; 