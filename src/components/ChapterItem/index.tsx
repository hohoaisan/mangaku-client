import React from 'react';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GestureResponderEvent} from 'react-native';

import {StackParams} from 'navigation';
import {Text, Box, HStack, Pressable, Link} from 'native-base';
import {Chapter} from 'types';

import {paths} from 'navigation';

type NavigationProps = NativeStackNavigationProp<StackParams, 'ComicDetail'>;
type RouteProps = RouteProp<StackParams, 'ComicDetail'>;

export const ChapterItem: React.FC<Chapter> = chapter => {
  const route = useRoute<RouteProps>();
  const {comicId} = route.params;
  const {navigate} = useNavigation<NavigationProps>();
  const handleChapterPress = (event?: GestureResponderEvent) => {
    if (event) {
      event.preventDefault();
    }
    navigate('ComicChapter', {
      comicId,
      chapterId: chapter.id,
    });
  };
  return (
    <Pressable>
      <HStack
        justifyContent={'space-between'}
        mb={{base: 1, md: 2}}
        mt={{base: 1, md: 2}}>
        <Box flex={1}>
          <Link
            _web={{
              href: paths.ComicChapter?.toString()
                .replace(':comicId', comicId)
                .replace(':chapterId', chapter.id),
            }}
            onPress={handleChapterPress}
            flex={1}>
            <Text fontSize={'md'} fontWeight={'semibold'} noOfLines={1}>
              {`Chapter ${chapter.number}${
                chapter.name ? `: ${chapter.name}` : ''
              }`}
            </Text>
          </Link>
        </Box>
        <HStack space={2}>
          {chapter.volume && (
            <Text fontWeight={'semibold'} noOfLines={1}>
              {`Vol ${chapter.volume}`}
            </Text>
          )}
          {chapter.createdAt && (
            <Text noOfLines={1}>
              {new Date(chapter.createdAt).toLocaleDateString()}
            </Text>
          )}
        </HStack>
      </HStack>
    </Pressable>
  );
};
