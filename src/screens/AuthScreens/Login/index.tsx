import React, {ReactElement} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../../../navigation';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  ScrollView,
} from 'native-base';
import {StyleSheet, GestureResponderEvent} from 'react-native';
type NavigationProps = NativeStackNavigationProp<StackParams, 'Login'>;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});

export function Login(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const handleSignUpPress = (event?: GestureResponderEvent) => {
    if (event) {
      event.preventDefault();
    }
    navigate('Register');
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
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to discover more culture!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'primary.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="primary">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                marginRight={2}
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user
              </Text>
              <Link
                _web={{href: '/register'}}
                onPress={handleSignUpPress}
                _text={{
                  color: 'primary.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
}
