import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement, useCallback} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  RefreshControl,
} from 'react-native';
import {StackParams} from '../../navigation';
import {Box, Heading, ScrollView, HStack} from 'native-base';
import {LandingSection, Container, SearchInput} from 'components';
import ScreenWrapper from '../helpers/ScreenWrapper';

import queryClient from 'query';

import {LandingSectionProps} from 'types';
import {EnumSection} from 'types/enum';

import landingBG from 'assets/images/landing_bg.jpeg';

import strings from 'configs/strings';
const {
  sections: {landing: landingStrings},
} = strings;

type NavigationProps = NativeStackNavigationProp<StackParams, 'Home'>;

const sections: LandingSectionProps[] = [
  {
    id: EnumSection.RECOMMENDED,
    heading: landingStrings.recommended,
    customQuery: {
      limit: 6,
      sortBy: 'rating:DESC',
    },
  },
  {
    id: EnumSection.LATEST_UPDATE,
    heading: landingStrings.lastedUpdate,
    customQuery: {
      limit: 12,
      sortBy: 'updatedAt:DESC',
    },
  },
  {
    id: EnumSection.RECENTLY_ADDED,
    heading: landingStrings.recentlyAdded,
    customQuery: {
      limit: 12,
      sortBy: 'createdAt:DESC',
    },
  },
];

export function Home(): ReactElement {
  const {navigate} = useNavigation<NavigationProps>();
  const handleSearch = useCallback(
    (search: string) => {
      navigate('Search', {search});
    },
    [navigate],
  );

  const refetch = () => {
    queryClient.invalidateQueries(EnumSection.LATEST_UPDATE);
    queryClient.invalidateQueries(EnumSection.RECENTLY_ADDED);
    queryClient.invalidateQueries(EnumSection.RECOMMENDED);
  };

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} enabled={true} />
      }>
      <ScrollView flex={1}>
        <ImageBackground
          source={landingBG as ImageSourcePropType}
          resizeMode="cover"
          style={{width: '100%', height: 'auto'}}>
          <HStack
            width={'100%'}
            minH={{base: 150, sm: 200, md: 300}}
            bgColor={'#00000080'}>
            <Container justifyContent={'center'} alignItems={'center'}>
              <Box mb={4}>
                <Heading color={'white'} textAlign={'center'}>
                  {landingStrings.title}
                </Heading>
              </Box>
              <Box>
                <SearchInput onSearchSubmit={handleSearch} />
              </Box>
            </Container>
          </HStack>
        </ImageBackground>
        {sections.map(section => (
          <Box key={section.id} mt={4} mb={8}>
            <LandingSection
              {...section}
              handleViewMore={() => {
                navigate('Search', {
                  sortBy: section.customQuery?.sortBy,
                });
              }}
            />
          </Box>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
