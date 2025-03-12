import React, { useEffect } from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, loadFavorites } from '../redux/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={{ alignItems: 'center'}}>
      <Text>Favorites</Text>
      <Button title="Add 'Shape of You' to Favorites" onPress={handleAddFavorite} />
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title} by {item.artist}</Text>
            <Button title="Remove" onPress={() => handleRemoveFavorite(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;
