import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {Input, HStack, IInputProps, IconButton, Icon} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';

export type SearchInputProps = IInputProps & {
  defaultValue?: string;
  onSearchSubmit?: (text: string) => void;
};

export function SearchInput({
  defaultValue,
  onSearchSubmit,
  size,
}: SearchInputProps): ReactElement {
  const [searchString, setSearchString] = useState('');
  useEffect(() => setSearchString(defaultValue || ''), []);
  const onSubmit = useCallback(() => {
    if (onSearchSubmit) {
      onSearchSubmit(searchString);
    }
  }, [onSearchSubmit, searchString]);
  const onInputChange = useCallback(
    (text: string) => {
      setSearchString(text);
    },
    [setSearchString],
  );
  return (
    <HStack space={2} w={{base: '100%', md: 500}}>
      <Input
        bgColor={'white'}
        flex={1}
        value={searchString}
        placeholder="Type here to search"
        onSubmitEditing={onSubmit}
        onChangeText={onInputChange}
        size={size}
      />
      <IconButton
        bgColor={'primary.600'}
        justifyContent={'center'}
        alignContent={'center'}
        onPress={onSubmit}
        icon={
          <Icon
            as={<VectorIcon name="search-outline" />}
            size="sm"
            color="white"
          />
        }
      />
    </HStack>
  );
}
