import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {StackParams} from '../../navigation';
import {Box, Heading, Button} from 'native-base';
import {Platform} from 'react-native';
import ScreenWrapper from 'screens/helpers/ScreenWrapper';
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
              Opps
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
              {`This ${isNative ? 'screen' : 'page'} was not found`}
            </Heading>
          </Box>
          {canGoBack && (
            <Button mt="2" colorScheme="primary" onPress={handleGoBack}>
              Go Back
            </Button>
          )}
        </Box>
      </Box>
    </ScreenWrapper>
  );
}
