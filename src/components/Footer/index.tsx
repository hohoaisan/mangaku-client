import React from 'react';

import {Box, HStack, IBoxProps, Link, Text} from 'native-base';

import {paths, ScreenName} from 'navigation';
import {Container} from 'components';
import useLinkPress from 'hooks/useLinkPress';

type FooterProps = IBoxProps & {
  scrollToTop?: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  children,
  scrollToTop,
  ...props
}) => {
  const handleLinkPress = useLinkPress();

  return (
    <Box width={'100%'} bgColor={'#35353a'} {...props} paddingY={10}>
      <Container>
        <HStack justifyContent={'space-between'}>
          <HStack>
            <Text textAlign={'center'} color={'white'}>
              Make with ♥ by Ho Hoai San
            </Text>
          </HStack>
          <HStack justifyContent={'center'} space={{base: 2, md: 4}}>
            <Link _web={{href: '/'}} onPress={handleLinkPress(ScreenName.HOME)}>
              <Text textAlign={'center'} color={'white'}>
                Home
              </Text>
            </Link>
            <Link
              _web={{href: paths.Login as string}}
              onPress={handleLinkPress(ScreenName.LOGIN)}>
              <Text textAlign={'center'} color={'white'}>
                Login
              </Text>
            </Link>
            <Link
              _web={{href: paths.Register as string}}
              onPress={handleLinkPress(ScreenName.REGISTER)}>
              <Text textAlign={'center'} color={'white'}>
                Register
              </Text>
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
