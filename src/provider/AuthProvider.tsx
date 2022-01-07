import React, {useRef} from 'react';
import useAuth from 'hooks/useAuth';
import {Center, Spinner} from 'native-base';

const AuthProvider: React.FC = ({children}) => {
  const auth = useAuth();
  const firstRender = useRef(true);
  if (auth.isLoading && firstRender.current) {
    firstRender.current = false;
    return (
      <Center w={'100%'} h={'100%'}>
        <Spinner />
      </Center>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
