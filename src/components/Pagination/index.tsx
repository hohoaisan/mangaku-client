import React from 'react';

import {Box, HStack, Button, IconButton, Icon} from 'native-base';
import usePagination, {UsePaginationProps} from 'hooks/usePagination';
import VectorIcon from 'react-native-vector-icons/Ionicons';

export const Pagination: React.FC<UsePaginationProps> = ({
  children,
  ...props
}) => {
  const {items} = usePagination(props);
  return (
    <Box>
      <HStack space={1} alignItems={'center'}>
        {items.map(
          ({page, type, selected, onClick: onPress, ...item}, index) => {
            let box = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              box = (
                <Button
                  variant={'unstyled'}
                  disabled
                  cursor={'none'}
                  onPress={onPress}>
                  …
                </Button>
              );
            } else if (type === 'page') {
              box = (
                <Button
                  variant={selected ? 'solid' : 'unstyled'}
                  onPress={onPress}
                  {...item}>
                  {page}
                </Button>
              );
            } else if (type === 'previous') {
              box =
                props.page && props.page <= 1 ? null : (
                  <IconButton
                    size={'sm'}
                    variant={'outline'}
                    onPress={onPress}
                    icon={
                      <Icon
                        size={'sm'}
                        as={<VectorIcon name="chevron-back-outline" />}
                        color="white"
                      />
                    }
                  />
                );
            } else if (type === 'next') {
              box =
                props.page &&
                props.count &&
                props.page >= props.count ? null : (
                  <IconButton
                    size={'sm'}
                    variant={'outline'}
                    onPress={onPress}
                    icon={
                      <Icon
                        size={'sm'}
                        as={<VectorIcon name="chevron-forward-outline" />}
                        color="white"
                      />
                    }
                  />
                );
            } else {
              box = (
                <Button {...item} variant={'outline'} onPress={onPress}>
                  {type}
                </Button>
              );
            }

            return <Box key={index}>{box}</Box>;
          },
        )}
      </HStack>
    </Box>
  );
};
