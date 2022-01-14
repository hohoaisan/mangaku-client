import React from 'react';
import {GestureResponderEvent, Platform} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {
  HStack,
  IconButton,
  Icon,
  Text,
  Box,
  StatusBar,
  Link,
} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';

import {Container} from 'components';
import {paths, ScreenName, StackParams} from 'navigation';

import strings from 'configs/strings';

const isNative = Platform.OS !== 'web';

const AppBarItem = [
  {
    key: 'favorite',
    screen: ScreenName.FAVORITE,
    href: paths.Favorite,
    icon: 'heart-outline',
  },
  {
    key: 'search',
    screen: ScreenName.SEARCH,
    href: paths.Search,
    icon: 'search-outline',
  },
  {
    key: 'profile',
    screen: ScreenName.PROFILE,
    href: paths.Favorite,
    icon: 'person-circle-outline',
  },
];
const AppBar: React.FC<NativeStackHeaderProps> = ({navigation}) => {
  const {canGoBack, goBack, navigate} = navigation;
  const isCanGoBack = canGoBack();
  const handleLinkPress =
    (screen: keyof StackParams) => (event?: GestureResponderEvent) => {
      if (event) {
        event.preventDefault();
      }
      navigate(screen);
    };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop />
      <HStack bg="primary.900" px="1" py="3">
        <Container>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <HStack space="4" alignItems="center">
              {isCanGoBack && isNative && (
                <IconButton
                  onPress={goBack}
                  icon={
                    <Icon
                      size="sm"
                      as={<VectorIcon name="arrow-back-outline" />}
                      color="white"
                    />
                  }
                />
              )}
              <Link
                _web={{href: '/'}}
                onPress={handleLinkPress(ScreenName.HOME)}>
                <Text color="white" fontSize="20" fontWeight="bold">
                  {strings.title}
                </Text>
              </Link>
            </HStack>
            <HStack space="2">
              {AppBarItem.map(item => (
                <Link key={item.key} _web={{href: item.href as string}}>
                  <IconButton
                    onPress={handleLinkPress(item.screen)}
                    icon={
                      <Icon
                        as={<VectorIcon name={item.icon} />}
                        size="sm"
                        color="white"
                      />
                    }
                  />
                </Link>
              ))}
            </HStack>
          </HStack>
        </Container>
      </HStack>
    </>
  );
};

export default AppBar;
