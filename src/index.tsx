import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './utils/WebIcon';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from 'redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
