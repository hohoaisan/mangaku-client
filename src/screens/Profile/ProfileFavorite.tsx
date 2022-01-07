import React, {ReactElement} from 'react';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListRenderItemInfo} from 'react-native';
import {
  Box,
  Text,
  Heading,
  HStack,
  Spinner,
  FlatList,
  useBreakpointValue,
  Button,
  Center,
} from 'native-base';

import {Container, ComicCardFavorite} from 'components';
import {ScreenName, StackParams} from '../../navigation';

import {PROFILE_FAVORITED} from 'query/queryKeys';
import {getFavoriteComics} from 'apis/comic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

import {Comic, ComicFavoriteItem} from 'types';

type NavigationProps = NativeStackNavigationProp<
  StackParams,
  ScreenName.PROFILE
>;

export function ProfileFavorite(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();

  const {data, isLoading, isRefetching, isError, error} = useQuery(
    PROFILE_FAVORITED,
    () => getFavoriteComics({limit: 6}),
    {
      keepPreviousData: false,
    },
  );

  const isQueryLoading = isLoading || isRefetching;

  const columns = useBreakpointValue({base: 2, sm: 3, lg: 6});

  const handleViewMore = () => {
    navigate(ScreenName.FAVORITE);
  };

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
  return (
    <Box w={'full'}>
      <Container>
        <HStack mb={2} justifyContent={'space-between'}>
          <Heading fontWeight="medium">Favorites</Heading>
          <Button size="xs" onPress={handleViewMore}>
            View more
          </Button>
        </HStack>
        <Box>
          {isQueryLoading ? (
            <Box
              w="100%"
              mt={5}
              mb={5}
              justifyContent={'center'}
              alignItems={'center'}>
              <Spinner color="cyan.500" />
            </Box>
          ) : (
            <>
              {!!data?.data?.length || (
                <Center py={5}>
                  <Text>No favorite</Text>
                </Center>
              )}
              {!!data?.data && (
                <HStack space={0} flexWrap={'wrap'} w="100%">
                  <FlatList
                    w="100%"
                    listKey={`profile-favorite-list-${columns}`}
                    key={columns}
                    data={data?.data || []}
                    keyExtractor={(item: Comic) => item.id}
                    numColumns={columns}
                    renderItem={({
                      item,
                    }: ListRenderItemInfo<ComicFavoriteItem>) => (
                      <Box flex={1} maxW={`${100 / columns}%`}>
                        <Box margin={2}>
                          <ComicCardFavorite {...item.comic} />{' '}
                        </Box>
                      </Box>
                    )}
                  />
                </HStack>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
