import React, {ReactElement} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Box,
  Text,
  Heading,
  HStack,
  Button,
  Spinner,
  FlatList,
  useBreakpointValue,
} from 'native-base';
import {ComicCard, Container} from 'components';

import {useQuery} from 'react-query';
import {getAllComics} from 'apis/comic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

import {Comic, LandingSectionProps} from 'types';
import strings from 'configs/strings';

const {buttons: buttonStrings} = strings;

export function LandingSection({
  id,
  heading,
  customQuery,
  hideViewmore,
  handleViewMore,
  getComics,
}: LandingSectionProps & {
  handleViewMore?: () => void;
}): ReactElement {
  const {data, isLoading, isRefetching, isError, error} = useQuery(
    [id, customQuery],
    () =>
      getComics
        ? getComics(customQuery || {})
        : getAllComics(customQuery || {}),
    {
      keepPreviousData: false,
    },
  );

  const isQueryLoading = isLoading || isRefetching;

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
  return (
    <Box>
      <Container>
        <HStack mb={2} justifyContent={'space-between'}>
          <Heading fontWeight="medium">{heading}</Heading>
          {!!hideViewmore || (
            <Button size="xs" onPress={handleViewMore}>
              {buttonStrings.viewMore}
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
            <HStack space={0} flexWrap={'wrap'} w="100%">
              <FlatList
                w="100%"
                listKey={`landing-list-${id}-${columns}`}
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
