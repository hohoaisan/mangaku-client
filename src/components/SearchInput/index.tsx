import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {Input, HStack, IInputProps, IconButton, Icon} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';
import strings from 'configs/strings';
const {
  sections: {search: searchStrings},
} = strings;

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
  const onResetSearch = useCallback(() => {
    setSearchString('');
    if (onSearchSubmit) {
      onSearchSubmit('');
    }
  }, [onSearchSubmit, setSearchString]);
  return (
    <HStack space={2} w={{base: '100%', md: 500}}>
      <HStack flex={1}>
        <Input
          bgColor={'white'}
          flex={1}
          value={searchString}
          placeholder={searchStrings.inputPlaceholder}
          onSubmitEditing={onSubmit}
          onChangeText={onInputChange}
          size={size}
        />
        {!!searchString && (
          <IconButton
            bgColor={'red.400'}
            justifyContent={'center'}
            alignContent={'center'}
            onPress={onResetSearch}
            icon={
              <Icon
                as={<VectorIcon name="close-outline" />}
                size="sm"
                color="white"
              />
            }
          />
        )}
      </HStack>
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
