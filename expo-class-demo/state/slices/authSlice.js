import { createSlice } from '@reduxjs/toolkit';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { Platform } from 'react-native';

export const saveTokensSecurely = async (tokens) => {
  if (Platform.OS !== 'web') {
    await setItemAsync('authTokens', JSON.stringify(tokens));
  }
};

export const getTokensFromSecureStore = async () => {
  if (Platform.OS !== 'web') {
    const stored = await getItemAsync('authTokens');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};


const initialState = {
  accessToken: null,
  idToken: null,
  refreshToken: null,
  expiresIn: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    },
    clearTokens(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { storeTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
