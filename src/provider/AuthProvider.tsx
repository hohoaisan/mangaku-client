import React from 'react';
import useAuth from 'hooks/useAuth';
import {Center, Spinner} from 'native-base';

const AuthProvider: React.FC = ({children}) => {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
      <Center w={'100%'} h={'100%'}>
        <Spinner />
      </Center>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
