import React, {useEffect} from 'react';

/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/redux/store';
import {NativeBaseProvider} from 'native-base';
import theme from './src/themes/nativebase';

const AppProvider: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppProvider);
