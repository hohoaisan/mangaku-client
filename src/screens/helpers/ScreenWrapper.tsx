import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Box, FlatList, IScrollViewProps} from 'native-base';
import {Footer} from 'components';

const ScreenWrapper: React.FC<IScrollViewProps> = ({
  children,
  refreshControl,
}) => {
  const height = useWindowDimensions().height;
  return (
    <FlatList
      flex={1}
      refreshControl={refreshControl}
      listKey="rootList"
      initialNumToRender={1}
      ListFooterComponent={<Footer />}
      data={[1]}
      renderItem={() => (
        <Box width={'100%'} flex={1} minHeight={height}>
          {children}
        </Box>
      )}
    />
  );
};

export default ScreenWrapper;
