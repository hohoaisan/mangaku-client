import React, {ReactElement, useEffect} from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenName, StackParams} from 'navigation';

import {Box, Text, Heading, Link, HStack, ScrollView} from 'native-base';

import AuthRegister from '../auth-forms/AuthRegister';
import useAuth from 'hooks/useAuth';
import strings from 'configs/strings';
const {
  pages: {signup: signupStrings},
} = strings;
const {buttons} = strings;

type NavigationProps = NativeStackNavigationProp<StackParams, 'Register'>;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});

export function Register(): ReactElement {
  const auth = useAuth();
  const {navigate} = useNavigation<NavigationProps>();
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(ScreenName.HOME);
    }
  }, [auth.isLoggedIn, navigate]);
  const handleSignInPress = (event?: GestureResponderEvent) => {
    if (event) {
      event.preventDefault();
    }
    navigate(ScreenName.LOGIN);
  };
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
            {signupStrings.greeting}
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            {signupStrings.greeting2}
          </Heading>
          <AuthRegister onSuccess={handleSignInPress} />
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              marginRight={2}
              _dark={{
                color: 'warmGray.200',
              }}>
              {signupStrings.haveAccount}
            </Text>
            <Link
              _web={{href: '/login'}}
              onPress={handleSignInPress}
              _text={{
                color: 'primary.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}>
              {buttons.signin}
            </Link>
          </HStack>
        </Box>
      </Box>
    </ScrollView>
  );
}
