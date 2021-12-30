import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Box, ScrollView, IScrollViewProps} from 'native-base';
import {Footer} from 'components';

const ScreenWrapper: React.FC<IScrollViewProps> = ({children, ...props}) => {
  const height = useWindowDimensions().height;
  return (
    <ScrollView {...props}>
      <Box width={'100%'} minHeight={height}>
        {children}
      </Box>
      <Footer />
    </ScrollView>
  );
};

export default ScreenWrapper;
