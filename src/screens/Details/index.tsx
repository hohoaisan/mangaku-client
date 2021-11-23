import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {Button, Text, View} from 'react-native';
import {StackParams} from '../../navigation';

type NavigationProps = NativeStackNavigationProp<StackParams, 'Details'>;
type RouteProps = RouteProp<StackParams, 'Details'>;

export function Details(): ReactElement {
  const {push, popToTop, navigate, goBack} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps>();

  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}
