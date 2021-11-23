import React, {useRef, useState} from 'react';
import {SafeAreaView, View, Platform} from 'react-native';
import {Navigation} from './navigation';
import logo from './logo.png';

const isNative = Platform.OS !== 'web';

const App = () => {
  return <Navigation />;
};

export default App;
