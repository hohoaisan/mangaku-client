import {Stars} from 'components';
import useAuth from 'hooks/useAuth';
import {
  Box,
  Button,
  Center,
  Input,
  Modal,
  useDisclose,
  Text,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';

// react query
import {useMutation, useQuery} from 'react-query';
import {REVIEW} from 'query/queryKeys';
import {getReview, deleteReview, updateReview, createReview} from 'apis/review';
import {useFocusEffect} from '@react-navigation/native';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import ToastService from 'services/toast.service';
import strings from 'configs/strings';

const {
  entities: {review: reviewStrings},
} = strings;

const {buttons} = strings;

export type ReviewButtonProps = {
  comicId: string;
};

export const ReviewButton: React.FC<ReviewButtonProps> = ({comicId}) => {
  const auth = useAuth();
  const userId = auth.user?.id || '';
  const [isEdit, setIsEdit] = useState(false);
  const [stars, setStars] = useState(5);
  const [content, setContent] = useState('');
  const modalDisclose = useDisclose();
  const {isLoading, refetch, data} = useQuery(
    [REVIEW, comicId, auth.user?.id],
    () => getReview(comicId, auth.user?.id || ''),
    {
      enabled: false,
      retry: 0,
      keepPreviousData: false,
    },
  );

  const removeReviewMutation = useMutation(
    () => deleteReview(comicId, userId),
    {
      onError: err => {
        const message = getAPIErrorMessage(err);
        ToastService.error(message);
      },
      onSuccess: () => {
        ToastService.success(reviewStrings.mutations.deleteSuccess);
        setStars(5);
        setContent('');
        setIsEdit(false);
        modalDisclose.onClose();
      },
      onSettled: () => {
        refetch();
      },
    },
  );

  const addReviewMutation = useMutation(
    () =>
      createReview(comicId, {
        rating: stars,
        content,
      }),
    {
      onError: err => {
        const message = getAPIErrorMessage(err);
        ToastService.error(message);
      },
      onSuccess: () => {
        ToastService.success(reviewStrings.mutations.createSuccess);
        modalDisclose.onClose();
      },
      onSettled: () => {
        refetch();
      },
    },
  );

  const updateReviewMutation = useMutation(
    () =>
      updateReview(comicId, userId, {
        rating: stars,
        content,
      }),
    {
      onError: err => {
        const message = getAPIErrorMessage(err);
        ToastService.error(message);
      },
      onSuccess: () => {
        ToastService.success(reviewStrings.mutations.updateSuccess);
        modalDisclose.onClose();
      },
      onSettled: () => {
        refetch();
      },
    },
  );

  useFocusEffect(
    useCallback(() => {
      if (auth.isLoggedIn) {
        refetch();
      }
    }, [auth.isLoggedIn, refetch]),
  );

  useEffect(() => {
    if (data) {
      setStars(data.rating);
      setContent(data.content);
      setIsEdit(true);
    } else {
      setStars(5);
      setContent('');
      setIsEdit(false);
    }
  }, [data]);

  const isReviewLoading =
    isLoading ||
    removeReviewMutation.isLoading ||
    addReviewMutation.isLoading ||
    updateReviewMutation.isLoading;

  return (
    <Box>
      <Button
        onPress={isReviewLoading ? undefined : modalDisclose.onToggle}
        isDisabled={isReviewLoading || !auth.isLoggedIn}
        size={'sm'}>
        {reviewStrings.title}
      </Button>
      <Modal {...modalDisclose}>
        <Modal.Content>
          <Modal.CloseButton isDisabled={isReviewLoading || !auth.isLoggedIn} />
          <Modal.Header>{reviewStrings.title}</Modal.Header>
          <Modal.Body>
            <Box mb={4}>
              <Center>
                <Stars stars={stars} onChange={setStars} />
              </Center>
            </Box>
            <Box>
              <Box mb={2}>
                <Text fontWeight={'bold'}>{reviewStrings.content}</Text>
              </Box>
              <Box>
                <Input
                  multiline
                  numberOfLines={5}
                  value={content}
                  size={'md'}
                  onChangeText={setContent}
                />
              </Box>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            {isEdit ? (
              <Button.Group space={2}>
                <Button
                  bgColor={'red.500'}
                  onPress={() => removeReviewMutation.mutate()}
                  isDisabled={isReviewLoading || !auth.isLoggedIn}>
                  {buttons.delete}
                </Button>
                <Button
                  onPress={() => updateReviewMutation.mutate()}
                  isDisabled={isReviewLoading || !auth.isLoggedIn}>
                  {buttons.update}
                </Button>
              </Button.Group>
            ) : (
              <Button.Group space={2}>
                <Button
                  onPress={() => addReviewMutation.mutate()}
                  isDisabled={isReviewLoading || !auth.isLoggedIn}>
                  {buttons.save}
                </Button>
              </Button.Group>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
