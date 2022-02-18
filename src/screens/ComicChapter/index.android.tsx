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
  Dimensions,
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
  useDisclose,
} from 'native-base';
import {StackParams} from '../../navigation';

import {Container, FloatingCommentContent} from 'components';

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

import Swiper from 'react-native-web-swiper';

import strings from 'configs/strings';
import {ChapterPage} from 'types';
const {
  pages: {chapter: chapterStrings},
} = strings;

type NavigationProps = NativeStackNavigationProp<StackParams, 'ComicChapter'>;
type RouteProps = RouteProp<StackParams, 'ComicChapter'>;

type PageProps = {
  index?: number;
  activeIndex?: number;
} & ChapterPage;

export const Page: React.FC<PageProps> = ({index, activeIndex, ...page}) => {
  index = index || 0;
  activeIndex = activeIndex || 0;
  if (index !== activeIndex && Math.abs(index - activeIndex) > 1) {
    return null;
  }
  return (
    <Box
      key={`${page.imageId}${page.order}`}
      flex={1}
      mt={2}
      mb={5}
      bgColor="red.400">
      <Image
        bgColor={'white'}
        height={'100%'}
        source={{
          uri: resolveImgUrl(page.url),
        }}
        alt={chapterStrings.pageAlt.replace('$number', String(page.order))}
        resizeMode="contain"
      />
    </Box>
  );
};

export function ComicChapter(): ReactElement {
  const scrollRef = useRef<BaseScrollView>();
  const {navigate} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps>();
  const {comicId, chapterId} = params;
  const commentModal = useDisclose(false);
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
    <ScrollView
      flex={1}
      ref={scrollRef}
      refreshControl={
        <RefreshControl
          refreshing={comicQuery.isRefetching || chapterQuery.isRefetching}
          onRefresh={refetch}
        />
      }
      bgColor={'gray.900'}>
      <Container>
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
                maxW={{base: 5, md: 8}}
                minW={{base: 5, md: 8}}
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
                noOfLines={1}
                color={'white'}>
                {comic.title}
              </Heading>
              <Heading fontSize={{base: 'xs', md: 'md'}} color={'white'}>
                {chapterStrings.chapterAlt.replace(
                  '$number',
                  String(chapter.number),
                )}
                -
                {chapter.volume &&
                  chapterStrings.volumeAlt.replace(
                    '$number',
                    String(chapter.volume),
                  )}
              </Heading>
            </Box>
          </HStack>
        </Pressable>
      </Container>
      <Box flex={1} minHeight={Dimensions.get('window').height} mb={50}>
        <Container height={'100%'}>
          <Swiper
            minDistanceForAction={0.1}
            key={`${chapterId} ${comicId}`}
            controlsProps={{
              dotsPos: false,
              nextPos: false,
              prevPos: false,
            }}>
            {chapterQuery.data?.pages.map(page => (
              <Page key={`${chapterId} ${comicId} ${page.order}`} {...page} />
            ))}
          </Swiper>
          <Box>
            <HStack justifyContent={'space-between'} alignItems="center">
              {chapter.prevChapter && (
                <Button
                  size={{base: 'sm', md: 'md'}}
                  onPress={handleSwitchChapter(chapter.prevChapter.id)}>
                  {chapterStrings.prevChapter.replace(
                    '$number',
                    String(chapter.prevChapter.number),
                  )}
                </Button>
              )}
              <Box>
                <Button onPress={commentModal.onToggle}>Bình luận</Button>
              </Box>
              {chapter.nextChapter && (
                <Button
                  size={{base: 'sm', md: 'md'}}
                  onPress={handleSwitchChapter(chapter.nextChapter.id)}>
                  {chapterStrings.nextChapter.replace(
                    '$number',
                    String(chapter.nextChapter.number),
                  )}
                </Button>
              )}
            </HStack>
          </Box>
        </Container>
      </Box>
      <FloatingCommentContent {...commentModal} comicId={comicId} />
    </ScrollView>
  );
}
