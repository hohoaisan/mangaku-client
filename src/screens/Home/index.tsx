import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement, useCallback} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import {StackParams} from '../../navigation';
import {
  Box,
  Text,
  Heading,
  ScrollView,
  HStack,
  Button,
  Spinner,
  FlatList,
  useBreakpointValue,
} from 'native-base';
import {ComicCard, Container, SearchInput} from 'components';
import ScreenWrapper from '../helpers/ScreenWrapper';

import {useQuery} from 'react-query';
import queryClient from 'query';
import {getAllComics} from 'apis/comic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

import {Comic, LandingSectionProps} from 'types';
import {EnumSection} from 'types/enum';

import landingBG from 'assets/images/landing_bg.jpeg';

type NavigationProps = NativeStackNavigationProp<StackParams, 'Home'>;

const sections: LandingSectionProps[] = [
  {
    id: EnumSection.RECOMMENDED,
    heading: 'Recommended',
    customQuery: {
      limit: 6,
      sortBy: 'rating:DESC',
    },
  },
  {
    id: EnumSection.LATEST_UPDATE,
    heading: 'Latest Update',
    customQuery: {
      limit: 12,
      sortBy: 'updatedAt:DESC',
    },
  },
  {
    id: EnumSection.RECENTLY_ADDED,
    heading: 'Recently Added',
    customQuery: {
      limit: 12,
      sortBy: 'createdAt:DESC',
    },
  },
];

function LandingSection({
  id,
  heading,
  customQuery,
  hideViewmore,
}: LandingSectionProps): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const {data, isLoading, isRefetching, isError, error} = useQuery(
    [id, customQuery],
    () => getAllComics(customQuery || {}),
    {
      keepPreviousData: false,
    },
  );

  const isQueryLoading = isLoading || isRefetching;

  const columns = useBreakpointValue({base: 2, sm: 3, lg: 6});

  const handleViewMoreClick = useCallback(() => {
    navigate('Search', {
      sortBy: customQuery?.sortBy,
    });
  }, [customQuery, navigate]);

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
    <Box>
      <Container>
        <HStack mb={2} justifyContent={'space-between'}>
          <Heading fontWeight="medium">{heading}</Heading>
          {!!hideViewmore || (
            <Button size="xs" onPress={handleViewMoreClick}>
              View more
            </Button>
          )}
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
            <HStack space={0} flexWrap={'wrap'}>
              <FlatList
                key={columns}
                data={data?.data || []}
                keyExtractor={(item: Comic) => item.id}
                numColumns={columns}
                renderItem={({item}: ListRenderItemInfo<Comic>) => (
                  <Box flex={1} margin={2}>
                    <ComicCard {...item} />
                  </Box>
                )}
              />
            </HStack>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export function Home(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const handleSearch = useCallback(
    (search: string) => {
      navigate('Search', {search});
    },
    [navigate],
  );

  const refetch = () => {
    queryClient.invalidateQueries(EnumSection.LATEST_UPDATE);
    queryClient.invalidateQueries(EnumSection.RECENTLY_ADDED);
    queryClient.invalidateQueries(EnumSection.RECOMMENDED);
  };

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} />
      }>
      <ScrollView flex={1}>
        <ImageBackground
          source={landingBG as ImageSourcePropType}
          resizeMode="cover"
          style={{width: '100%', height: 'auto'}}>
          <HStack
            width={'100%'}
            minH={{base: 150, sm: 200, md: 300}}
            bgColor={'#00000080'}>
            <Container justifyContent={'center'} alignItems={'center'}>
              <Box mb={4}>
                <Heading color={'white'} textAlign={'center'}>
                  Start reading your desired comic
                </Heading>
              </Box>
              <Box>
                <SearchInput onSearchSubmit={handleSearch} />
              </Box>
            </Container>
          </HStack>
        </ImageBackground>
        {sections.map(section => (
          <Box key={section.id} mt={4} mb={8}>
            <LandingSection {...section} />
          </Box>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
