import React from 'react';

import {Box, HStack, IBoxProps, Text} from 'native-base';

export const Footer: React.FC<IBoxProps> = ({children, ...props}) => {
  return (
    <Box
      flexDirection={'row'}
      paddingY={10}
      width={'100%'}
      bgColor={'#35353a'}
      {...props}>
      <HStack flex={1} justifyContent={'center'}>
        <Text textAlign={'center'} color={'white'}>
          Make with ♥ by Ho Hoai San
        </Text>
      </HStack>
    </Box>
  );
};
