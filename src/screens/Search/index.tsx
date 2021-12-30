import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RefreshControl} from 'react-native';
import {
  Box,
  Text,
  Heading,
  ScrollView,
  HStack,
  Input,
  Button,
  Spinner,
} from 'native-base';

import {ComicCard, Container} from 'components';
import {StackParams} from '../../navigation';

import {COMICS} from 'query/queryKeys';
import {getAllComics} from 'apis/comic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import {ComicsQuery} from 'types';
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
          <HStack flexWrap={'wrap'}>
            {data.data?.map(({id, title, cover}) => (
              <Box key={id} w={{base: '50%', sm: '25%', xl: '16%'}} padding={2}>
                <ComicCard key={id} id={id} title={title} cover={cover} />
              </Box>
            ))}
          </HStack>
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
  const [searchString, setSearchString] = useState('');
  const {params} = useRoute<RouteProps>();
  const queries = {...params};
  const {data, isLoading, isRefetching, refetch, isFetched, isError, error} =
    useQuery([COMICS, queries], () => getAllComics(queries), {
      keepPreviousData: false,
    });
  const onInputChange = (text: string) => {
    setSearchString(text);
  };
  const onSearchSubmit = () => {
    setParams({search: searchString});
  };

  useFocusEffect(
    useCallback(() => {
      if (params?.search) {
        refetch();
      }
    }, [params?.search, refetch]),
  );

  useEffect(() => {
    if (params?.search) {
      setSearchString(params?.search);
    }
  }, []);

  return (
    <ScreenWrapper
      refreshControl={
        isFetched ? (
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        ) : undefined
      }>
      <ScrollView bgColor={'white'}>
        <Container>
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
                <Input
                  flex={1}
                  value={searchString}
                  placeholder="Type here to search"
                  onSubmitEditing={onSearchSubmit}
                  onChangeText={onInputChange}
                />
                <Button onPress={onSearchSubmit}>Search</Button>
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
      </ScrollView>
    </ScreenWrapper>
  );
}
