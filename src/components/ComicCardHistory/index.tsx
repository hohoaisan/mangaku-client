import React, {useMemo} from 'react';
import {useMutation} from 'react-query';
import {Box, IconButton, Icon, Text, HStack} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';

import {ComicReadHistoryItem} from 'types';
import {ComicCard} from 'components';

import {deleteComicReadHistory} from 'apis/history';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import queryClient from 'query';

import ToastService from 'services/toast.service';
import {PROFILE_READ_HISTORY, READ_HISTORY, CHAPTERS} from 'query/queryKeys';
import strings from 'configs/strings';

export const ComicCardHistory: React.FC<ComicReadHistoryItem> = ({
  chapter,
  comic,
  lastRead,
  ...props
}) => {
  const removeComicHistoryMutation = useMutation(deleteComicReadHistory, {
    onError: err => {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(PROFILE_READ_HISTORY);
      queryClient.invalidateQueries(READ_HISTORY);
      queryClient.invalidateQueries(CHAPTERS);
    },
  });

  const onRemoveFavorite = () => removeComicHistoryMutation.mutate(comic.id);

  const lastReadDate = useMemo(() => {
    const date = new Date(lastRead);
    const now = new Date();
    if (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    ) {
      return date.toLocaleTimeString();
    }
    return date.toLocaleDateString();
  }, [lastRead]);
  const chapterText = useMemo(
    () =>
      strings.pages.chapter.chapterAlt.replace(
        '$number',
        String(chapter.number),
      ),
    [chapter.number],
  );
  return (
    <Box w={'100%'} h={'100%'} flex={1} position={'relative'}>
      <Box>
        <ComicCard {...comic} />
        <HStack>
          <Text noOfLines={1} flex={1}>
            {lastReadDate}
          </Text>
          <Text noOfLines={1}>{chapterText}</Text>
        </HStack>
      </Box>
      <Box
        position={'absolute'}
        top={0}
        right={0}
        bgColor={'white'}
        m={2}
        overflow={'hidden'}
        borderRadius={100}>
        <IconButton
          onPress={onRemoveFavorite}
          disabled={removeComicHistoryMutation.isLoading}
          icon={
            <Icon color={'red.600'} as={<VectorIcon name="trash-outline" />} />
          }
        />
      </Box>
    </Box>
  );
};
