import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement, useCallback} from 'react';
import {StackParams} from '../../navigation';
import {Box, Text, Image, Pressable, IBoxProps} from 'native-base';
import resolveImgUrl from 'utils/resolveImageUrl';

type NavigationProps = NativeStackNavigationProp<StackParams, 'Home'>;

export type ComicCardProps = IBoxProps & {
  id: string;
  title: string;
  cover: string;
};

export function ComicCard({
  id,
  title,
  cover,
  ...props
}: ComicCardProps): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const onComicPress = useCallback(() => {
    navigate('ComicDetail', {comicId: id});
  }, [id, navigate]);
  return (
    <Box {...props}>
      <Pressable onPress={onComicPress}>
        <Box shadow={2} borderWidth={0}>
          <Box style={{width: '100%', aspectRatio: 12 / 16}}>
            <Image
              source={{
                uri: cover
                  ? resolveImgUrl(cover)
                  : 'https://via.placeholder.com/300x400',
              }}
              width={'100%'}
              height={'100%'}
              resizeMode="cover"
              alt={title}
            />
          </Box>
        </Box>
        <Box>
          <Text fontWeight="medium" fontSize={'md'} noOfLines={2}>
            {title}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
}
