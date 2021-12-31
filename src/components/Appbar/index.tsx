import React from 'react';
import {Platform} from 'react-native';
import {HStack, IconButton, Icon, Text, Box, StatusBar} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';

import {Container} from 'components';

const AppBar: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="primary.900" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="primary.900" />
      <HStack bg="primary.900" px="1" py="3">
        <Container>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <HStack space="4" alignItems="center">
              <IconButton
                icon={
                  <Icon
                    size="sm"
                    as={<VectorIcon name="menu-outline" />}
                    color="white"
                  />
                }
              />
              <Text color="white" fontSize="20" fontWeight="bold">
                Mangaku
              </Text>
            </HStack>
            <HStack space="2">
              <IconButton
                icon={
                  <Icon
                    as={<VectorIcon name="heart-outline" />}
                    size="sm"
                    color="white"
                  />
                }
              />
              <IconButton
                icon={
                  <Icon
                    as={<VectorIcon name="search-outline" />}
                    color="white"
                    size="sm"
                  />
                }
              />
              <IconButton
                icon={
                  <Icon
                    as={<VectorIcon name="person-circle-outline" />}
                    color="white"
                    size="sm"
                  />
                }
              />
            </HStack>
          </HStack>
        </Container>
      </HStack>
    </>
  );
};

export default AppBar;
