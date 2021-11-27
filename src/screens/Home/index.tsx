import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {StackParams} from '../../navigation';
import {Container} from 'native-base';
type NavigationProps = NativeStackNavigationProp<StackParams, 'Home'>;

export function Home(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigate('Details', {data: '🤪'})}
      />
      <Button
        title="Go to Search"
        onPress={() => navigate('Search', {query: 'bruh bruh lmao'})}
      />
      <Button title="Go to Login" onPress={() => navigate('Login')} />
      <Button title="Go to Sign up" onPress={() => navigate('Register')} />
      <Button title="Go to Not found" onPress={() => navigate('NotFound')} />
      <Button title="Go to Profile" onPress={() => navigate('Profile')} />
    </View>
  );
}
