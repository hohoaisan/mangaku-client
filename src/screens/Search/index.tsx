import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import {StackParams} from '../../navigation';

type NavigationProps = NativeStackNavigationProp<StackParams, 'Search'>;
type RouteProps = RouteProp<StackParams, 'Search'>;

export function Search(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps>();
  return (
    <View>
      <Text>Search Screen</Text>
      <Text>{params?.query}</Text>
    </View>
  );
}
