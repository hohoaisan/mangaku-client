import React, {ReactElement} from 'react';
import {
  NavigationContainer,
  LinkingOptions,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {Details, Home, Profile, Favorite, Search} from '../screens';
import './GestureHandler';

export type StackParams = {
  Home: undefined;
  Details: {data: string} | undefined;
  Search: {query: string} | undefined;
  Favorite: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();
const linking: LinkingOptions<StackParams> = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      Home: '/',
      Details: '/details',
      Search: '/search',
      Favorite: '/favorite',
      Profile: '/profile',
    },
  },
};

export function Navigation(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
