import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import AudioPlayer from './src/components/AudioPlayer';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <HomeScreen />
        <AudioPlayer />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
