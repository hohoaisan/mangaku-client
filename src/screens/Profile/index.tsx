import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {RefreshControl} from 'react-native';
import {ScreenName, StackParams} from 'navigation';
import {
  Avatar,
  HStack,
  Heading,
  Box,
  Button,
  Divider,
  Spinner,
  Text,
} from 'native-base';

import ScreenWrapper from 'screens/helpers/ScreenWrapper';

import {Container} from 'components';
import queryClient from 'query';
import AuthService from 'services/auth.service';
import useAuth from 'hooks/useAuth';
import {useQuery} from 'react-query';
import {
  PROFILE,
  PROFILE_FAVORITED,
  PROFILE_READ_HISTORY,
} from 'query/queryKeys';
import {getProfile} from 'apis/profile';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import {ProfileFavorite} from './ProfileFavorite';
import {ProfileReadHistory} from './ProfileReadHistory';
import BecomeAuthor from './BecomeAuthor';
import EditProfile from './EditProfile';

import strings from 'configs/strings';
const {buttons} = strings;

type NavigationProps = NativeStackNavigationProp<StackParams, 'Profile'>;

export const Profile: React.FC = () => {
  const auth = useAuth();
  const {replace} = useNavigation<NavigationProps>();
  const {
    isError,
    isLoading,
    error,
    data,
    refetch: refetchProfile,
  } = useQuery(PROFILE, getProfile, {
    enabled: false,
  });

  const refetch = () => {
    refetchProfile();
    queryClient.invalidateQueries(PROFILE_FAVORITED);
    queryClient.invalidateQueries(PROFILE_READ_HISTORY);
  };
  const handleLogoutClick = () => {
    AuthService.logout();
    replace(ScreenName.HOME);
  };

  useFocusEffect(
    useCallback(() => {
      if (!auth.isLoggedIn) {
        queryClient.cancelQueries();
        return replace(ScreenName.LOGIN);
      }
      refetchProfile();
    }, [auth.isLoggedIn, replace, refetchProfile]),
  );

  if (!auth.isLoggedIn) {
    return null;
  }

  if (isError) {
    const errorMessage = getAPIErrorMessage(error);
    return (
      <Box
        w="100%"
        mt={5}
        mb={5}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text>{errorMessage}</Text>
      </Box>
    );
  }

  if (isLoading || !data) {
    return (
      <Box
        w="100%"
        mt={5}
        mb={5}
        justifyContent={'center'}
        alignItems={'center'}>
        <Spinner color="cyan.500" />
      </Box>
    );
  }

  const {name, email} = data;

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} />
      }>
      <Box
        flex={1}
        _light={{background: 'white'}}
        _dark={{background: 'dark.300'}}>
        <Container flex={1}>
          <Box mt={4} flex={1}>
            <HStack mb={4} alignItems="center" justifyContent="space-between">
              <Box flexDirection={{base: 'column', md: 'row'}} mx={2}>
                <Box mr={{base: 0, md: 8}} mb={{base: 4, md: 0}}>
                  <Avatar
                    shadow={2}
                    bg="amber.500"
                    size={{base: 'xl', md: '2xl'}}>
                    {name}
                  </Avatar>
                </Box>
                <Box justifyContent={{base: 'flex-start', md: 'center'}}>
                  <Heading size={{base: 'md', sm: 'lg', md: 'xl'}} mb={2}>
                    {name}
                  </Heading>
                  <Heading size="sm" fontWeight="normal">
                    {email}
                  </Heading>
                </Box>
              </Box>
              <HStack space={2} direction={{base: 'column', md: 'row'}}>
                <EditProfile />
                <BecomeAuthor />
                <Button onPress={handleLogoutClick}>{buttons.signout}</Button>
              </HStack>
            </HStack>
            <Divider />
            <Box my={2}>
              <Box>
                <ProfileFavorite />
              </Box>
            </Box>
            <Divider />
            <Box my={2}>
              <Box>
                <ProfileReadHistory />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ScreenWrapper>
  );
};
