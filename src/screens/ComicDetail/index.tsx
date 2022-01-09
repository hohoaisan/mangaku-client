import {RouteProp, useRoute} from '@react-navigation/native';
import React, {ReactElement, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {
  Badge,
  Text,
  Box,
  ScrollView,
  Heading,
  Spinner,
  AspectRatio,
  Image,
  HStack,
  Divider,
  VStack,
  Button,
  useBreakpointValue,
} from 'native-base';
import {StackParams} from '../../navigation';

import {
  Container,
  ChapterItem,
  FloatingComment,
  Stars,
  FavoriteButton,
  ReviewButton,
} from 'components';

// react query
import {useQuery} from 'react-query';
import {COMIC, CHAPTERS} from 'query/queryKeys';
import {getComic} from 'apis/comic';
import {getAllChapters} from 'apis/chapter';

import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import resolveImgUrl from 'utils/resolveImageUrl';
import ScreenWrapper from 'screens/helpers/ScreenWrapper';

type RouteProps = RouteProp<StackParams, 'ComicDetail'>;

export function ComicDetail(): ReactElement {
  const route = useRoute<RouteProps>();
  const {comicId} = route.params;

  const [showDetail, setShowDetail] = useState(false);
  const response = useBreakpointValue({base: false, md: true});

  useEffect(() => {
    setShowDetail(response);
  }, [response]);

  const comicQuery = useQuery([COMIC, comicId], () =>
    getComic(comicId, {params: {scope: 'detail'}}),
  );
  const [chapterQueries, setChapterQueries] = useState({limit: 10});

  const chapterQuery = useQuery([CHAPTERS, comicId, chapterQueries], () =>
    getAllChapters(comicId, chapterQueries),
  );

  if (!comicId) {
    return <Text>''</Text>;
  }

  const refetch = () => {
    chapterQuery.refetch();
    comicQuery.refetch();
  };

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl
          refreshing={comicQuery.isRefetching || chapterQuery.isRefetching}
          onRefresh={refetch}
        />
      }>
      {(() => {
        if (comicQuery.isError || chapterQuery.isError) {
          const errorMessage =
            getAPIErrorMessage(comicQuery.error) ||
            getAPIErrorMessage(chapterQuery.error);
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

        if (
          !comicQuery.data ||
          comicQuery.isLoading ||
          !chapterQuery.data ||
          chapterQuery.isLoading
        ) {
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

        const handleGetAllChapterClick = () =>
          setChapterQueries({limit: chapterQuery.data.total});

        const {
          title,
          description,
          cover,
          rating,
          viewCount,
          numFavorites,
          authors,
          genres,
          formats,
        } = comicQuery.data;

        const {data} = chapterQuery.data;

        return (
          <ScrollView bgColor={'white'}>
            <Container mb={10}>
              <Box minW={'100%'}>
                <Box
                  flexDirection={{base: 'column', md: 'row'}}
                  mt={{base: 5, md: 10}}
                  mb={5}>
                  <Box alignItems={'center'}>
                    <Box
                      borderRadius={5}
                      overflow={'hidden'}
                      padding={1}
                      borderWidth={1}
                      borderColor={'blue.100'}
                      borderStyle={'solid'}
                      mr={{base: 0, md: 5}}
                      mb={{base: 2, md: 0}}>
                      <AspectRatio
                        minW={{base: 150, md: 250}}
                        maxW={{base: 150, md: 250}}
                        ratio={12 / 16}
                        borderRadius={5}
                        overflow={'hidden'}>
                        <Image
                          source={{
                            uri: cover
                              ? resolveImgUrl(cover)
                              : 'https://via.placeholder.com/300x400',
                          }}
                          alt={title}
                        />
                      </AspectRatio>
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <Box mb={{base: 2, md: 8}}>
                      <Heading
                        noOfLines={2}
                        textAlign={{base: 'center', md: 'left'}}
                        fontSize={{base: '2xl', sm: '2xl', md: '4xl'}}>
                        {title}
                      </Heading>
                    </Box>
                    <Box mb={2}>
                      <Box>
                        <HStack space={2}>
                          <Heading fontSize={{base: 'md', md: 'lg'}}>
                            Views:
                          </Heading>
                          <Heading
                            fontSize={{base: 'md', md: 'lg'}}
                            fontWeight={'normal'}>{`${
                            viewCount ? viewCount : 0
                          }`}</Heading>
                        </HStack>
                        <Divider mt={{base: 1, md: 2}} mb={{base: 1, md: 2}} />
                      </Box>
                      <Box>
                        <HStack space={2} alignItems="center">
                          <Heading fontSize={{base: 'md', md: 'lg'}}>
                            Ratings:
                          </Heading>
                          <HStack alignItems="center" space={2}>
                            {rating ? (
                              <Stars stars={rating} isDisabled showLabel />
                            ) : (
                              <Heading
                                fontSize={{base: 'md', md: 'lg'}}
                                fontWeight={'normal'}>
                                N/A
                              </Heading>
                            )}
                            <ReviewButton comicId={comicId} />
                          </HStack>
                        </HStack>
                        <Divider mt={{base: 1, md: 2}} mb={{base: 1, md: 2}} />
                      </Box>
                      <Box>
                        <HStack space={2}>
                          <Heading fontSize={{base: 'md', md: 'lg'}}>
                            Favorites:
                          </Heading>
                          <Heading
                            fontSize={{base: 'md', md: 'lg'}}
                            fontWeight={'normal'}>{`${
                            numFavorites ? numFavorites : 'N/A'
                          }`}</Heading>
                        </HStack>
                        <Divider mt={{base: 1, md: 2}} mb={{base: 1, md: 2}} />
                      </Box>
                      <Box>
                        <HStack space={2}>
                          <Heading fontSize={{base: 'md', md: 'lg'}}>
                            Authors:
                          </Heading>
                          <HStack space={2} flexWrap={'wrap'} flex={1}>
                            {authors.map(({id, name}) => (
                              <Badge key={id}>{name}</Badge>
                            ))}
                          </HStack>
                        </HStack>
                        <Divider mt={{base: 1, md: 2}} mb={{base: 1, md: 2}} />
                      </Box>
                      <Box display={showDetail ? 'flex' : 'none'}>
                        <HStack space={2}>
                          <Heading fontSize={{base: 'md', md: 'lg'}}>
                            Formats:
                          </Heading>
                          <HStack space={2} flexWrap={'wrap'} flex={1}>
                            {formats.map(({id, name}) => (
                              <Badge key={id}>{name}</Badge>
                            ))}
                          </HStack>
                        </HStack>
                        <Divider mt={{base: 1, md: 2}} mb={{base: 1, md: 2}} />
                      </Box>
                      <Box display={showDetail ? 'flex' : 'none'}>
                        <HStack space={2}>
                          <Heading fontSize={{base: 'md', md: 'lg'}}>
                            Genres:
                          </Heading>
                          <HStack space={2} flexWrap={'wrap'} flex={1}>
                            {genres.map(({id, name}) => (
                              <Badge key={id}>{name}</Badge>
                            ))}
                          </HStack>
                        </HStack>
                        <Divider mt={{base: 1, md: 2}} mb={{base: 1, md: 2}} />
                      </Box>
                      <VStack space={2}>
                        <Heading fontSize={{base: 'md', md: 'lg'}}>
                          Description:
                        </Heading>
                        <Text
                          fontSize={{base: 'sm', md: 'md'}}
                          numberOfLines={showDetail ? undefined : 2}>
                          {description}
                        </Text>
                      </VStack>
                    </Box>
                    <HStack space={2}>
                      <Button
                        onPress={() => setShowDetail(!showDetail)}
                        size={'md'}>
                        {`${showDetail ? 'Hide' : 'Show'} details`}
                      </Button>
                      <Box>
                        <FavoriteButton comicId={comicId} />
                      </Box>
                    </HStack>
                  </Box>
                </Box>
                <Box>
                  <Box mb={2}>
                    <Heading fontSize={'2xl'}>Chapters</Heading>
                  </Box>
                  <Box>
                    {data && data.length ? (
                      <Box>
                        <Box mb={4}>
                          {data.map(chapter => (
                            <Box key={chapter.id}>
                              <ChapterItem {...chapter} />
                              <Divider />
                            </Box>
                          ))}
                        </Box>
                        {chapterQuery.data.total !== data.length && (
                          <HStack justifyContent={'center'}>
                            <Button onPress={handleGetAllChapterClick}>
                              Show all chapters
                            </Button>
                          </HStack>
                        )}
                      </Box>
                    ) : (
                      <Box mb={2} mt={2}>
                        <Text textAlign={'center'}>No chapter</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Container>
          </ScrollView>
        );
      })()}
      <FloatingComment hideLabel comicId={comicId} />
    </ScreenWrapper>
  );
}
