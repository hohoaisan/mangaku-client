import React from 'react';
import {Navigation} from './navigation';

// react query client
import {ReactQueryDevtools} from 'react-query/devtools';
import {QueryClientProvider} from 'react-query';
import queryClient from 'query';

import AuthService from 'services/auth.service';
import {setupAxiosInterceptors} from 'apis/_axios/interceptors';
import AuthProvider from 'provider/AuthProvider';

// init services
setupAxiosInterceptors();
AuthService.init();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
