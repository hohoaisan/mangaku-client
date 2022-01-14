import React, {ReactElement, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenName, StackParams} from '../../../navigation';
import {
  Box,
  Text,
  Heading,
  VStack,
  Link,
  HStack,
  ScrollView,
} from 'native-base';
import {StyleSheet, GestureResponderEvent} from 'react-native';
import useAuth from 'hooks/useAuth';
import AuthLogin from '../auth-forms/AuthLogin';
import strings from 'configs/strings';

const {
  pages: {signin: signinStrings},
} = strings;
const {buttons} = strings;

type NavigationProps = NativeStackNavigationProp<StackParams, 'Login'>;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});

export function Login(): ReactElement {
  const auth = useAuth();
  const {navigate, replace} = useNavigation<NavigationProps>();
  const handleSignUpPress = (event?: GestureResponderEvent) => {
    if (event) {
      event.preventDefault();
    }
    navigate(ScreenName.REGISTER);
  };
  useEffect(() => {
    if (auth.isLoggedIn) {
      replace(ScreenName.HOME);
    }
  }, [auth.isLoggedIn, replace]);
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Box
        safeArea
        flex={1}
        alignItems="center"
        justifyContent={{base: 'flex-start', md: 'center'}}>
        <Box
          px="5"
          py="8"
          w={{base: '100%', md: 500}}
          h={{base: '100%', md: 'fit-content'}}
          borderRadius={{base: 0, md: 10}}
          _light={{background: 'white'}}
          _dark={{background: 'dark.300'}}
          shadow={{base: 0, md: 3}}>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            {signinStrings.greeting}
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            {signinStrings.greeting2}
          </Heading>

          <VStack space={3} mt="5">
            <AuthLogin />
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                marginRight={2}
                _dark={{
                  color: 'warmGray.200',
                }}>
                {signinStrings.noAccount}
              </Text>
              <Link
                _web={{href: '/register'}}
                onPress={handleSignUpPress}
                _text={{
                  color: 'primary.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                {buttons.signup}
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
}
