import React, {useState} from 'react';
import {
  Box,
  HStack,
  IBoxProps,
  Icon,
  IconButton,
  IInputProps,
  Input,
} from 'native-base';

import VectorIcon from 'react-native-vector-icons/Ionicons';

import queryClient from 'query';
import {useMutation} from 'react-query';
import {COMMENTS} from 'query/queryKeys';
import {createComment} from 'apis/comment';

import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import ToastService from 'services/toast.service';

export type InputCommentProps = IBoxProps &
  Pick<IInputProps, 'isDisabled' | 'placeholder'> & {
    comicId: string;
  };

export const InputComment: React.FC<InputCommentProps> = ({
  isDisabled,
  placeholder,
  comicId,
  ...props
}) => {
  const [content, setContent] = useState('');
  const createCommentMutation = useMutation(
    () => createComment(comicId, content),
    {
      onError: error => {
        const message = getAPIErrorMessage(error);
        ToastService.error(message);
      },
      onSuccess: () => {
        setContent('');
      },
      onSettled: () => {
        queryClient.invalidateQueries(COMMENTS);
      },
    },
  );

  const onSubmit = () => {
    if (content || content.trim()) {
      createCommentMutation.mutate();
    }
  };
  return (
    <HStack space={1} {...props}>
      <HStack flex={1}>
        <Input
          w="full"
          multiline
          size="md"
          value={content}
          onChangeText={text => setContent(text)}
          placeholder={placeholder ? placeholder : 'Leave a comment'}
          isDisabled={isDisabled}
        />
      </HStack>
      <Box alignSelf={'flex-start'}>
        <IconButton
          onPress={onSubmit}
          isDisabled={isDisabled}
          bgColor={'purple.600'}
          icon={
            <Icon
              color={'white'}
              as={VectorIcon}
              name="paper-plane-outline"
              size="sm"
            />
          }
        />
      </Box>
    </HStack>
  );
};
