import React from 'react';
import {Navigation} from './navigation';

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
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
