import React from 'react';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GestureResponderEvent} from 'react-native';

import {StackParams} from 'navigation';
import {Text, HStack, Pressable, Link, Icon, Button} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';
import {Chapter} from 'types';

import {paths} from 'navigation';
import strings from 'configs/strings';

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
        alignItems="center"
        mb={{base: 1, md: 2}}
        mt={{base: 1, md: 2}}
        space={1}>
        <HStack flex={1} opacity={chapter.lastRead ? 0.5 : 1}>
          <Link
            _web={{
              href: paths.ComicChapter?.toString()
                .replace(':comicId', comicId)
                .replace(':chapterId', chapter.id),
            }}
            onPress={handleChapterPress}
            flex={1}>
            <Text fontSize={'md'} fontWeight={'semibold'} noOfLines={1}>
              {`${strings.entities.chapter.title} ${chapter.number}${
                chapter.name ? `: ${chapter.name}` : ''
              }`}
            </Text>
          </Link>
        </HStack>
        {chapter.isLastedRead && (
          <Button
            size="xs"
            bgColor={'purple.600'}
            onPress={handleChapterPress}
            startIcon={
              <Icon
                color="white"
                as={<VectorIcon name="location-sharp" />}
                size="xs"
              />
            }>
            {strings.buttons.lastRead}
          </Button>
        )}
        <HStack space={2}>
          {chapter.volume && (
            <Text fontWeight={'semibold'} noOfLines={1}>
              {`${strings.entities.volume.title} ${chapter.volume}`}
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
