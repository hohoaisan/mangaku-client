import React from 'react';
import {Navigation} from './navigation';
import AppBar from 'components/Appbar';

import AuthService from 'services/auth.service';
import {setupAxiosInterceptors} from 'apis/_axios/interceptors';

// init services
setupAxiosInterceptors();
AuthService.init();

const App = () => {
  return (
    <>
      <AppBar />
      <Navigation />
    </>
  );
};

export default App;
