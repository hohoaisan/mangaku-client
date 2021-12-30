import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './utils/WebIcon';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from 'redux/store';

import {NativeBaseProvider} from 'native-base';
import theme from 'themes/nativebase';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
