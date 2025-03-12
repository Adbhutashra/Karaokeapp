import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
