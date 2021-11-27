import React from 'react';
import {VStack, Input, Heading, Icon} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';

function SearchBar() {
  return (
    <VStack width="100%" space={2} alignItems="center">
      <Input
        placeholder="Search People & Places"
        bg="transparent"
        width="100%"
        borderRadius="50"
        py="3"
        px="3"
        fontSize="14"
        // _web={{
        //   _focus: {borderColor: 'muted.300', style: {boxShadow: 'none'}},
        // }}
        InputRightElement={
          <Icon
            m="2"
            mr="3"
            size="6"
            color="muted.400"
            as={<VectorIcon name="search-outline" />}
          />
        }
      />
    </VStack>
  );
}

export default SearchBar;
