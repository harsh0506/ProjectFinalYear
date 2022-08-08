import React from 'react';
import { View, Image, Button, Text, Platform } from 'react-native';
import MainNavigation from './components/Navigation/MainNavigtaion';

const App = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MainNavigation />
    </View>
  );
};


export default App;



