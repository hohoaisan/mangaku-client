import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import {StackParams} from '../../navigation';

type NavigationProps = NativeStackNavigationProp<StackParams, 'Home'>;

export function Profile(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
