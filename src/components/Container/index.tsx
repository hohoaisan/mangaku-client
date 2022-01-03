import React from 'react';

import {Box, IBoxProps} from 'native-base';

const settings = {base: '95%', sm: '90%', md: 700, lg: 900, xl: 1200};

export const Container: React.FC<IBoxProps> = ({children, ...props}) => {
  return (
    <Box
      flexDirection={'row'}
      width={'100%'}
      justifyContent={'center'}
      flex={1}>
      <Box w={settings} minW={settings} maxW={settings} {...props}>
        {children}
      </Box>
    </Box>
  );
};
