import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, loadFavorites } from '../redux/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleAddFavorite = () => {
    const song = { id: '123', title: 'Shape of You', artist: 'Ed Sheeran' };
    dispatch(addFavorite(song));
    AsyncStorage.setItem('favorites', JSON.stringify([...favorites, song]));
  };

  const handleRemoveFavorite = (song) => {
    dispatch(removeFavorite(song));
    AsyncStorage.setItem('favorites', JSON.stringify(favorites.filter(item => item.id !== song.id)));
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text>Favorites</Text>
      <Button style={{}} onPress={handleAddFavorite} textStyle={{}}>
        Add 'Shape of You' to Favorites
      </Button>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title} by {item.artist}</Text>
            <Button style={{}} onPress={() => handleRemoveFavorite(item)} textStyle={{}}>
              Remove
            </Button>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;
