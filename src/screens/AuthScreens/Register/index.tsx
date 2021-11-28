import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
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
import {GestureResponderEvent, StyleSheet} from 'react-native';
type NavigationProps = NativeStackNavigationProp<StackParams, 'Register'>;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});

export function Register(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const handleSignUpPress = () => {
    return;
  };
  const handleSignInPress = (event?: GestureResponderEvent) => {
    if (event) {
      event.preventDefault();
    }
    navigate('Login');
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
            Sign up to have better experience!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button mt="2" colorScheme="primary">
              Sign up
            </Button>
          </VStack>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              marginRight={2}
              _dark={{
                color: 'warmGray.200',
              }}>
              Already have an account?
            </Text>
            <Link
              _web={{href: '/login'}}
              onPress={handleSignInPress}
              _text={{
                color: 'primary.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}>
              Sign in
            </Link>
          </HStack>
        </Box>
      </Box>
    </ScrollView>
  );
}
