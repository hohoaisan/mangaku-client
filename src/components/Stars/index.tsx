import React, {useCallback, useEffect, useState} from 'react';
import {HStack, Icon, IconButton, Text} from 'native-base';
import VectorIcon from 'react-native-vector-icons/Ionicons';

export type StarsProps = {
  stars: number;
  isDisabled?: boolean;
  showLabel?: boolean;
  onChange?: (star: number) => void;
};

export const Stars: React.FC<StarsProps> = ({
  stars,
  isDisabled,
  showLabel,
  onChange,
}) => {
  const [numStars, setNumStars] = useState(stars);
  useEffect(() => {
    setNumStars(stars);
  }, [stars]);
  const onStarChange = useCallback(
    (star: number) => () => {
      setNumStars(star);
      if (onChange) {
        onChange(star);
      }
    },
    [onChange],
  );
  return (
    <HStack alignItems="center" space={1}>
      <HStack>
        {[...Array(5)].map((number, index) => {
          return (
            <IconButton
              key={index}
              size={'sm'}
              onPress={isDisabled ? undefined : onStarChange(index + 1)}
              isDisabled={isDisabled}
              icon={
                <Icon
                  as={VectorIcon}
                  size={'sm'}
                  name={
                    numStars > index && numStars < index + 1
                      ? 'star-half'
                      : 'star'
                  }
                  color={numStars > index ? 'yellow.400' : 'warmGray.300'}
                />
              }
            />
          );
        })}
      </HStack>
      {showLabel && <Text>{`(${Math.round(stars * 10) / 10}/5)`}</Text>}
    </HStack>
  );
};
