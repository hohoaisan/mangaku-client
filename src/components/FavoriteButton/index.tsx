import React, {useCallback, useMemo} from 'react';
import useAuth from 'hooks/useAuth';
import {useFocusEffect} from '@react-navigation/native';

import {Button, Icon} from 'native-base';

import ToastService from 'services/toast.service';
import VectorIcon from 'react-native-vector-icons/Ionicons';

// react query
import {useMutation, useQuery} from 'react-query';
import {FAVORITE_COMIC_INDICATE} from 'query/queryKeys';
import {
  getFavoriteComic,
  createFavoriteComic,
  deleteFavoriteComic,
} from 'apis/comic';

import getAPIErrorMessage from 'utils/getAPIErrorMessage';

export type FavoriteButtonProps = {
  comicId: string;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({comicId}) => {
  const auth = useAuth();
  const {isLoading, isError, refetch, data, isRefetching} = useQuery(
    [FAVORITE_COMIC_INDICATE, comicId],
    () => getFavoriteComic(comicId),
    {
      enabled: false,
    },
  );
  const removeFavoriteMutation = useMutation(
    () => deleteFavoriteComic(comicId),
    {
      onError: error => {
        const message = getAPIErrorMessage(error);
        ToastService.error(message);
      },
      onSettled: () => {
        refetch();
      },
    },
  );

  const addFavoriteMutation = useMutation(() => createFavoriteComic(comicId), {
    onError: error => {
      const message = getAPIErrorMessage(error);
      ToastService.error(message);
    },
    onSettled: () => {
      refetch();
    },
  });

  const isFavoriteLoading =
    isLoading ||
    isRefetching ||
    removeFavoriteMutation.isLoading ||
    addFavoriteMutation.isLoading;

  useFocusEffect(
    useCallback(() => {
      if (auth.isLoggedIn) {
        refetch();
      }
    }, [auth.isLoggedIn, refetch]),
  );

  const bgColor = useMemo(() => {
    if (!auth.isLoggedIn) {
      return 'red.200';
    }
    if (data && data.comicId) {
      return 'red.900';
    }
    return 'red.500';
  }, [auth.isLoggedIn, data]);

  const onPress = useCallback(() => {
    if (!auth.isLoggedIn) {
      return ToastService.info('You need to login to add to favorite');
    }
    if (data && data.comicId) {
      return removeFavoriteMutation.mutate();
    }
    return addFavoriteMutation.mutate();
  }, [auth.isLoggedIn, addFavoriteMutation, removeFavoriteMutation, data]);

  const label = useMemo(() => {
    if (isFavoriteLoading) {
      return 'Loading';
    }
    if (data && data.comicId) {
      return 'Added to Favorite';
    }
    return 'Add to Favorite';
  }, [data, isFavoriteLoading]);

  if (isError) {
    return <Button>Favorite</Button>;
  }

  return (
    <Button
      bgColor={bgColor}
      onPress={onPress}
      disabled={isFavoriteLoading}
      startIcon={<Icon size="sm" as={<VectorIcon name="heart" />} />}>
      {label}
    </Button>
  );
};
