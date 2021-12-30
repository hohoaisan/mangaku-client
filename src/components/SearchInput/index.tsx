import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {Input, HStack, Button, IInputProps} from 'native-base';

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
      <Button onPress={onSubmit} size={size}>
        Search
      </Button>
    </HStack>
  );
}
