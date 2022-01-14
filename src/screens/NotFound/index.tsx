import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {StackParams} from '../../navigation';
import {Box, Heading, Button} from 'native-base';
import {Platform} from 'react-native';
import ScreenWrapper from 'screens/helpers/ScreenWrapper';

import strings from 'configs/strings';
const {
  buttons,
  pages: {notFound: notFoundStrings},
} = strings;

type NavigationProps = NativeStackNavigationProp<StackParams, 'NotFound'>;

const isNative = Platform.OS !== 'web';

export function NotFound(): ReactElement {
  const navigator = useNavigation<NavigationProps>();
  const canGoBack = navigator.canGoBack() || !isNative;
  const handleGoBack = () => {
    if (isNative) {
      navigator.goBack();
      return;
    }
    window.history.back();
  };
  return (
    <ScreenWrapper>
      <Box safeArea flex={1} alignItems="center" justifyContent="center">
        <Box>
          <Box mb={5}>
            <Heading
              size="xl"
              fontWeight="600"
              textAlign="center"
              mb={1}
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              {notFoundStrings.title}
            </Heading>
            <Heading
              mt="1"
              textAlign="center"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="sm">
              {notFoundStrings.subtitle}
            </Heading>
          </Box>
          {canGoBack && (
            <Button mt="2" colorScheme="primary" onPress={handleGoBack}>
              {buttons.goBack}
            </Button>
          )}
        </Box>
      </Box>
    </ScreenWrapper>
  );
}
