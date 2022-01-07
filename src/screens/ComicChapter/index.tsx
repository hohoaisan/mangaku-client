import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement, useCallback, useEffect, useRef} from 'react';
import {
  RefreshControl,
  GestureResponderEvent,
  Pressable,
  ScrollView as BaseScrollView,
} from 'react-native';
import {
  Spinner,
  Text,
  Box,
  ScrollView,
  HStack,
  Heading,
  AspectRatio,
  Image,
  Button,
} from 'native-base';
import {StackParams} from '../../navigation';

import {Container} from 'components';
// react query
import {useMutation, useQuery} from 'react-query';
import {
  CHAPTER,
  CHAPTERS,
  COMIC,
  PROFILE_READ_HISTORY,
  READ_HISTORY,
} from 'query/queryKeys';
import {getChapter} from 'apis/chapter';
import {getComic} from 'apis/comic';
import {addComicChapterToHistory} from 'apis/history';

import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import resolveImgUrl from 'utils/resolveImageUrl';
import queryClient from 'query';

type NavigationProps = NativeStackNavigationProp<StackParams, 'ComicChapter'>;
type RouteProps = RouteProp<StackParams, 'ComicChapter'>;

export function ComicChapter(): ReactElement {
  const scrollRef = useRef<BaseScrollView>();
  const {navigate} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps>();
  const {comicId, chapterId} = params;

  useFocusEffect(
    useCallback(() => {
      if (scrollRef?.current) {
        return scrollRef.current.scrollTo({x: 0, y: 0});
      }
    }, [chapterId]),
  );

  const chapterQuery = useQuery(
    [CHAPTER, chapterId],
    () => getChapter(comicId, chapterId),
    {
      keepPreviousData: true,
    },
  );

  const comicQuery = useQuery(
    [COMIC, comicId, chapterId],
    () => getComic(comicId),
    {
      keepPreviousData: true,
    },
  );

  const chapterReadMutation = useMutation(
    () => addComicChapterToHistory(comicId, chapterId),
    {
      retry: 1,
      onSettled: () => {
        queryClient.invalidateQueries(CHAPTERS);
        queryClient.invalidateQueries(PROFILE_READ_HISTORY);
        queryClient.invalidateQueries(READ_HISTORY);
      },
    },
  );

  useEffect(() => {
    chapterReadMutation.mutate();
  }, [comicId, chapterId]);

  const refetch = () => {
    chapterQuery.refetch();
    comicQuery.refetch();
  };

  const handleGoBackToManga = (event?: GestureResponderEvent) => {
    if (event) {
      event.preventDefault();
    }
    navigate('ComicDetail', {
      comicId,
    });
  };

  const handleSwitchChapter =
    (chapId: string) => (event?: GestureResponderEvent) => {
      if (event) {
        event.preventDefault();
      }
      navigate('ComicChapter', {
        comicId,
        chapterId: chapId,
      });
    };

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

  const comic = comicQuery.data;
  const chapter = chapterQuery.data;
  return (
    <Box flex={1} bgColor={'gray.900'}>
      <ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl
            refreshing={comicQuery.isRefetching || chapterQuery.isRefetching}
            onRefresh={refetch}
          />
        }>
        <Container>
          <Box>
            <Pressable onPress={handleGoBackToManga}>
              <HStack alignItems={'center'} mt={2} mb={2}>
                <Box
                  mr={{base: 2, md: 4}}
                  borderRadius={3}
                  overflow={'hidden'}
                  padding={1}
                  borderWidth={1}
                  borderColor={'white'}
                  borderStyle={'solid'}>
                  <AspectRatio
                    maxW={{base: 5, md: 10}}
                    minW={{base: 5, md: 10}}
                    ratio={12 / 16}
                    borderRadius={3}
                    overflow={'hidden'}>
                    <Image
                      source={{
                        uri: comic.cover
                          ? resolveImgUrl(comic.cover)
                          : 'https://via.placeholder.com/300x400',
                      }}
                      alt={comic.title}
                    />
                  </AspectRatio>
                </Box>
                <Box>
                  <Heading
                    fontSize={{base: 'sm', md: 'lg'}}
                    noOfLines={2}
                    color={'white'}>
                    {comic.title}
                  </Heading>
                  <Heading
                    fontSize={{base: 'xs', md: 'md'}}
                    color={'white'}>{`Chapter ${chapter.number}${
                    chapter.volume ? ` (Volume ${chapter.volume})` : ''
                  }`}</Heading>
                </Box>
              </HStack>
            </Pressable>
          </Box>
          <Box minW={'100%'} mb={5}>
            {chapter.pages.length ? (
              <Box>
                {chapter.pages.map(page => (
                  <Box
                    key={`${page.imageId}${page.order}`}
                    flex={1}
                    mt={2}
                    mb={5}>
                    <AspectRatio
                      w={'100%'}
                      ratio={12 / 16}
                      borderRadius={3}
                      overflow={'hidden'}>
                      <Image
                        source={{
                          uri: resolveImgUrl(page.url),
                        }}
                        alt={`Page ${page.order}`}
                        resizeMode="contain"
                        // fallbackElement={}
                      />
                    </AspectRatio>
                  </Box>
                ))}
                <HStack justifyContent={'space-between'}>
                  {chapter.prevChapter && (
                    <Button
                      size={{base: 'sm', md: 'md'}}
                      onPress={handleSwitchChapter(chapter.prevChapter.id)}>
                      {`< Chapter ${chapter.prevChapter.number}`}
                    </Button>
                  )}
                  <Button
                    onPress={handleGoBackToManga}
                    size={{base: 'sm', md: 'md'}}>
                    Back to manga
                  </Button>
                  {chapter.nextChapter && (
                    <Button
                      size={{base: 'sm', md: 'md'}}
                      onPress={handleSwitchChapter(chapter.nextChapter.id)}>
                      {`Chapter ${chapter.nextChapter.number} >`}
                    </Button>
                  )}
                </HStack>
              </Box>
            ) : (
              <Box>
                <Text>No page</Text>
              </Box>
            )}
          </Box>
        </Container>
      </ScrollView>
    </Box>
  );
}
