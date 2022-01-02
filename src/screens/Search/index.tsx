import React, {
  ReactElement,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {useQuery} from 'react-query';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RefreshControl,
  ListRenderItemInfo,
  ScrollView as BaseScrollView,
} from 'react-native';
import {
  Box,
  Text,
  Heading,
  HStack,
  Spinner,
  FlatList,
  useBreakpointValue,
} from 'native-base';

import {ComicCard, Container, Pagination, SearchInput} from 'components';
import {StackParams} from '../../navigation';

import {COMICS} from 'query/queryKeys';
import {getAllComics} from 'apis/comic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import {ComicsQuery, Comic} from 'types';
import ScreenWrapper from 'screens/helpers/ScreenWrapper';

type NavigationProps = NativeStackNavigationProp<StackParams, 'Search'>;
type RouteProps = RouteProp<StackParams, 'Search'>;

type SearchResultProps = {
  query: string | undefined;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
  isFetched: boolean;
  isRefetching: boolean;
  data: ComicsQuery | undefined;
};

function SearchResult({
  query,
  isError,
  error,
  isLoading,
  isFetched,
  isRefetching,
  data,
}: SearchResultProps): ReactElement {
  const {setParams} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps>();
  const columns = useBreakpointValue({base: 2, sm: 3, lg: 6});

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

  if (isLoading || isRefetching) {
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

  if (isFetched && data?.data?.length) {
    return (
      <Box>
        <Box mb={4}>
          <Heading fontSize={20} fontWeight={'medium'}>
            {query ? 'Search result' : 'Comic list'}
          </Heading>
        </Box>
        <Box>
          <HStack space={0} flexWrap={'wrap'}>
            <FlatList
              w="full"
              listKey="comic-search-list"
              key={columns}
              data={data?.data || []}
              keyExtractor={(item: Comic) => item.id}
              numColumns={columns}
              renderItem={({item}: ListRenderItemInfo<Comic>) => (
                <Box flex={1} maxW={`${100 / columns}%`}>
                  <Box margin={2}>
                    <ComicCard {...item} />
                  </Box>
                </Box>
              )}
            />
          </HStack>
          {data?.pages > 1 && (
            <HStack justifyContent={'center'} mt={5} mb={5}>
              <Pagination
                defaultPage={1}
                page={data?.page || Number.parseInt(String(params?.page), 10)}
                count={data?.pages}
                onChange={(event, value) => setParams({page: value})}
              />
            </HStack>
          )}
        </Box>
      </Box>
    );
  }
  return (
    <Box w="100%" mt={5} mb={5} justifyContent={'center'} alignItems={'center'}>
      <Text>No result</Text>
    </Box>
  );
}

export function Search(): ReactElement {
  const {setParams} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps>();
  const queries = {...params};
  const {data, isLoading, isRefetching, refetch, isFetched, isError, error} =
    useQuery([COMICS, queries], () => getAllComics(queries), {
      keepPreviousData: false,
    });

  const scrollRef = useRef<BaseScrollView>();
  useEffect(() => {
    if (scrollRef?.current) {
      return scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  }, [params]);

  const onSearchSubmit = (text: string) => {
    setParams({search: text});
  };

  useFocusEffect(
    useCallback(() => {
      if (params?.search) {
        refetch();
      }
    }, [params?.search, refetch]),
  );

  return (
    <ScreenWrapper
      refreshControl={
        isFetched ? (
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        ) : undefined
      }>
      <Container mb={4}>
        <Box minW={'100%'}>
          <Box alignSelf={'center'} mb={4} _web={{mb: 10}}>
            <Heading
              fontWeight="medium"
              textAlign={'center'}
              mt={5}
              mb={4}
              _web={{mt: 10}}>
              Search comic
            </Heading>
            <HStack space={2} w={{base: '100%', md: 500}}>
              <SearchInput
                defaultValue={params?.search}
                onSearchSubmit={onSearchSubmit}
              />
            </HStack>
          </Box>
          <Box>
            <SearchResult
              query={params?.search}
              isError={isError}
              error={error}
              isFetched={isFetched}
              isLoading={isLoading}
              isRefetching={isRefetching}
              data={data}
            />
          </Box>
        </Box>
      </Container>
    </ScreenWrapper>
  );
}
