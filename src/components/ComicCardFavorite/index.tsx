import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {Box, IconButton, Icon} from 'native-base';

import VectorIcon from 'react-native-vector-icons/Ionicons';

import {ComicCard, ComicCardProps} from 'components';
import {deleteFavoriteComic, createFavoriteComic} from 'apis/comic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import ToastService from 'services/toast.service';

export const ComicCardFavorite: React.FC<
  ComicCardProps & {
    onChanged?: () => void;
  }
> = ({onChanged, ...props}) => {
  const [favorite, setFavorite] = useState(true);

  const removeFavoriteMutation = useMutation(deleteFavoriteComic, {
    onError: err => {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    },
    onSettled: () => {
      setFavorite(false);
    },
  });

  const addFavoriteMutation = useMutation(createFavoriteComic, {
    onError: error => {
      const message = getAPIErrorMessage(error);
      ToastService.error(message);
    },
    onSettled: () => {
      setFavorite(true);
      onChanged && onChanged();
    },
  });

  const onRemoveFavorite = () => removeFavoriteMutation.mutate(props.id);

  const onFavoriteAgain = () => addFavoriteMutation.mutate(props.id);

  return (
    <Box w={'100%'} h={'100%'} flex={1} position={'relative'}>
      <ComicCard {...props} />
      <Box
        position={'absolute'}
        top={0}
        right={0}
        bgColor={'white'}
        m={2}
        overflow={'hidden'}
        borderRadius={100}>
        {favorite ? (
          <IconButton
            onPress={onRemoveFavorite}
            disabled={
              addFavoriteMutation.isLoading || removeFavoriteMutation.isLoading
            }
            icon={
              <Icon
                color={'red.600'}
                as={<VectorIcon name="trash-outline" />}
              />
            }
          />
        ) : (
          <IconButton
            onPress={onFavoriteAgain}
            disabled={
              addFavoriteMutation.isLoading || removeFavoriteMutation.isLoading
            }
            icon={
              <Icon
                color={'red.600'}
                as={<VectorIcon name="heart-outline" />}
              />
            }
          />
        )}
      </Box>
    </Box>
  );
};
