import React, {ReactElement} from 'react';
import {
  NavigationContainer,
  LinkingOptions,
  DefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Details,
  Home,
  Profile,
  Favorite,
  Search,
  Login,
  Register,
  NotFound,
  ComicDetail,
  ComicChapter,
  ReadHistory,
} from '../screens';

import './GestureHandler';

import {StackParams} from './types';
import {paths, ScreenName} from './enums';

import AppBar from 'components/Appbar';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator<StackParams>();
const linking: LinkingOptions<StackParams> = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    /* configuration for matching screens with paths */
    screens: paths,
  },
};

const isNative = Platform.OS !== 'web';

export type ScreenOptions = React.ComponentProps<typeof Stack.Screen>;

const screens: ScreenOptions[] = [
  {
    name: ScreenName.HOME,
    component: Home,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.SEARCH,
    component: Search,
    options: {headerShown: true, header: AppBar},
    initialParams: {
      page: 1,
      search: '',
      limit: 24,
      sortBy: 'title:ASC',
    },
  },
  {
    name: ScreenName.FAVORITE,
    component: Favorite,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.READ_HISTORY,
    component: ReadHistory,
    options: {headerShown: true, header: AppBar},
    initialParams: {
      page: 1,
      search: '',
      limit: 24,
    },
  },
  {
    name: ScreenName.PROFILE,
    component: Profile,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.DETAILS,
    component: Details,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.LOGIN,
    component: Login,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.REGISTER,
    component: Register,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.COMIC_DETAIL,
    component: ComicDetail,
    options: {headerShown: true, header: AppBar},
  },
  {
    name: ScreenName.COMIC_CHAPTER,
    component: ComicChapter,
    options: {headerShown: isNative ? false : true, header: AppBar},
  },
  {
    name: ScreenName.NOT_FOUND,
    component: NotFound,
    options: {headerShown: true, header: AppBar},
  },
];

export function Navigation(): ReactElement {
  return (
    <NavigationContainer theme={DefaultTheme} linking={linking}>
      <Stack.Navigator>
        {screens.map(props => (
          <Stack.Screen key={props.name} {...props} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
