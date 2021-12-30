import React, {ReactElement} from 'react';
import {
  NavigationContainer,
  LinkingOptions,
  DefaultTheme,
  PathConfigMap,
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
} from '../screens';

import './GestureHandler';
import {QueryString} from 'types';

export type StackParams = {
  Home: undefined;
  Details: {data: string} | undefined;
  Search: QueryString | undefined;
  Favorite: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  NotFound: undefined;
  ComicDetail: {comicId: string};
  ComicChapter: {comicId: string; chapterId: string};
};

export const paths: PathConfigMap<StackParams> = {
  Home: '/',
  Details: '/details',
  Search: '/comics',
  Favorite: '/favorite',
  Profile: '/profile',
  Login: '/login',
  Register: '/register',
  NotFound: '/*',
  ComicDetail: '/comics/:comicId',
  ComicChapter: '/comics/:comicId/chapters/:chapterId',
};

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

export type ScreenOptions = React.ComponentProps<typeof Stack.Screen>;

const screens: ScreenOptions[] = [
  {name: 'Home', component: Home, options: {headerShown: false}},
  {
    name: 'Search',
    component: Search,
    options: {headerShown: false},
    initialParams: {
      search: '',
      limit: 24,
      sortBy: 'title:ASC',
    },
  },
  {name: 'Favorite', component: Favorite, options: {headerShown: false}},
  {name: 'Profile', component: Profile, options: {headerShown: false}},
  {name: 'Details', component: Details, options: {headerShown: false}},
  {name: 'Login', component: Login, options: {headerShown: false}},
  {name: 'Register', component: Register, options: {headerShown: false}},
  {name: 'ComicDetail', component: ComicDetail, options: {headerShown: false}},
  {
    name: 'ComicChapter',
    component: ComicChapter,
    options: {headerShown: false},
  },
  {name: 'NotFound', component: NotFound, options: {headerShown: false}},
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
