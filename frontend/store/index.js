import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    spots: spotsReducer,
    reviews: reviewsReducer,
    bookings: bookingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 