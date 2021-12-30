import React from 'react';
import {Navigation} from './navigation';
import AppBar from 'components/Appbar';

// react query client
import {ReactQueryDevtools} from 'react-query/devtools';
import {QueryClientProvider} from 'react-query';
import queryClient from 'query';

import AuthService from 'services/auth.service';
import {setupAxiosInterceptors} from 'apis/_axios/interceptors';

// init services
setupAxiosInterceptors();
AuthService.init();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AppBar />
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
