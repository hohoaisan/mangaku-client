import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from 'themes/nativebase';
import {Navigation} from './navigation';
import AppBar from 'components/Appbar';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AppBar />
      <Navigation />
    </NativeBaseProvider>
  );
};

export default App;
