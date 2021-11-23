import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {Button, Text, View} from 'react-native';
import {StackParams} from '../../navigation';

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
    </View>
  );
}
