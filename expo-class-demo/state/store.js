import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import AuthReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: AuthReducer,
  },
});

export default store;
