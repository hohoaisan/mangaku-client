import React, {useMemo, useState} from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useDisclose,
  VStack,
} from 'native-base';

import VectorIcon from 'react-native-vector-icons/Ionicons';

import {Comment} from 'types';

import queryClient from 'query';
import {useMutation} from 'react-query';
import {COMMENTS} from 'query/queryKeys';
import {deleteComment, updateComment} from 'apis/comment';

import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import ToastService from 'services/toast.service';
import strings from 'configs/strings';

const {
  entities: {comment: commentStrings},
} = strings;

export const CommentCard: React.FC<Comment> = ({
  isEditable,
  id,
  comicId,
  createdAt,
  content: initialContent,
  user,
}) => {
  const [content, setContent] = useState(initialContent);
  const {isOpen, onOpen, onClose} = useDisclose(false);
  const time = useMemo(() => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  }, [createdAt]);

  const commentDeleteMutation = useMutation(() => deleteComment(comicId, id), {
    onError: error => {
      const message = getAPIErrorMessage(error);
      ToastService.error(message, {placement: 'top'});
    },
    onSuccess: () => {
      ToastService.success(commentStrings.mutations.deleteSuccess, {
        placement: 'top',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(COMMENTS);
    },
  });

  const commentUpdateMutation = useMutation(
    () => updateComment(comicId, id, content),
    {
      onError: error => {
        const message = getAPIErrorMessage(error);
        ToastService.error(message, {placement: 'top'});
      },
      onSuccess: () => {
        ToastService.success(commentStrings.mutations.updateSuccess, {
          placement: 'top',
        });
        onClose();
      },
      onSettled: () => {
        queryClient.invalidateQueries(COMMENTS);
      },
    },
  );

  const onCancel = () => {
    onClose();
    setContent(initialContent);
  };

  return (
    <VStack>
      <HStack space={2}>
        <Text fontWeight="bold" fontSize="md" noOfLines={1}>
          {user.name}
        </Text>
        <Text noOfLines={1}>·</Text>
        <Text noOfLines={1}>{time}</Text>
      </HStack>
      <HStack space={1} alignItems={'center'}>
        <Box flex={1}>
          {isOpen && isEditable ? (
            <Input
              size="md"
              value={content}
              multiline
              onChangeText={text => setContent(text)}
            />
          ) : (
            <Text fontSize="md">{content}</Text>
          )}
        </Box>
        {isEditable && (
          <HStack alignItems={'center'}>
            {isOpen ? (
              <>
                <IconButton
                  onPress={() => commentUpdateMutation.mutate()}
                  size={'sm'}
                  icon={
                    <Icon
                      as={VectorIcon}
                      name="checkbox-outline"
                      size="sm"
                      color={'green.600'}
                    />
                  }
                />
                <IconButton
                  onPress={onCancel}
                  size={'sm'}
                  icon={<Icon as={VectorIcon} name="close" size="sm" />}
                />
              </>
            ) : (
              <>
                <IconButton
                  onPress={onOpen}
                  size={'sm'}
                  icon={<Icon as={VectorIcon} name="create" size="sm" />}
                />
                <IconButton
                  size={'sm'}
                  onPress={() => commentDeleteMutation.mutate()}
                  icon={
                    <Icon
                      color={'red.600'}
                      as={VectorIcon}
                      name="trash"
                      size="sm"
                    />
                  }
                />
              </>
            )}
          </HStack>
        )}
      </HStack>
    </VStack>
  );
};
