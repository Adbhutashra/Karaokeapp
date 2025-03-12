import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async action to load the favorite songs from AsyncStorage
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      return state.filter(song => song.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
