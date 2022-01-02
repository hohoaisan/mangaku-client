import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GestureResponderEvent} from 'react-native';

import {StackParams} from 'navigation';
import {useCallback} from 'react';

type NavigationProps = NativeStackNavigationProp<StackParams>;

type HandleLinkType = <T extends keyof StackParams>(
  screen: T,
  params?: StackParams[T],
  callBack?: () => void,
) => (event?: GestureResponderEvent | undefined) => void;

export const useLinkPress = (): HandleLinkType => {
  const {navigate} = useNavigation<NavigationProps>();
  const handleLinkPress: HandleLinkType = useCallback(
    (screen, params, callBack) => (event?: GestureResponderEvent) => {
      if (event) {
        event.preventDefault();
      }
      navigate(screen as keyof StackParams, params);

      if (callBack) {
        callBack();
      }
    },
    [navigate],
  );

  return handleLinkPress;
};

export default useLinkPress;
