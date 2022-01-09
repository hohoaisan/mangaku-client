import React, {useEffect, useState} from 'react';
import {
  Actionsheet,
  Box,
  Divider,
  Fab,
  HStack,
  IBoxProps,
  Icon,
  KeyboardAvoidingView,
  Text,
  useDisclose,
  IActionsheetProps,
  FlatList,
  Spinner,
  Center,
} from 'native-base';

import VectorIcon from 'react-native-vector-icons/Ionicons';
import {
  RefreshControl,
  useWindowDimensions,
  ListRenderItemInfo,
} from 'react-native';

import {Container, Pagination, InputComment, CommentCard} from 'components';

import {Comment} from 'types';

import {useQuery} from 'react-query';
import {COMMENTS} from 'query/queryKeys';
import {getComments} from 'apis/comment';

import useAuth from 'hooks/useAuth';
import {useIsFocused} from '@react-navigation/native';

type FLoatingCommentContentProps = IActionsheetProps & {
  comicId: string;
};

const defaultQueries = {
  limit: 10,
  page: 1,
};

export const FloatingCommentContent: React.FC<FLoatingCommentContentProps> = ({
  comicId,
  ...props
}) => {
  const auth = useAuth();
  const height = useWindowDimensions().height;
  const [queries, setQueries] = useState(defaultQueries);
  const commentsQuery = useQuery(
    [COMMENTS, comicId, queries],
    () => getComments(comicId, queries),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    setQueries(defaultQueries);
  }, [props.isOpen]);
  const {data, isLoading, isRefetching} = commentsQuery;
  return (
    <Actionsheet {...props}>
      <Actionsheet.Content borderTopRadius={5} flexDirection="column" w="full">
        <KeyboardAvoidingView behavior="padding" w="full">
          <Container h="full" maxHeight={height * 0.8} minHeight={height * 0.6}>
            <Box flex={1} _web={{flexDir: 'column'}} flexDir="column-reverse">
              <Box my={5}>
                <InputComment
                  comicId={comicId}
                  isDisabled={!auth.isLoggedIn}
                  placeholder={
                    !auth.isLoggedIn ? 'You must login to comment' : undefined
                  }
                />
              </Box>
              <Box flex={1}>
                {(isLoading || isRefetching) && <Spinner />}
                {!data?.pages && (
                  <Center>
                    <Text>No comment</Text>
                  </Center>
                )}
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={false}
                      onRefresh={commentsQuery.refetch}
                    />
                  }
                  flex={1}
                  data={data?.data}
                  keyExtractor={(item: Comment) => item.id}
                  renderItem={({item}: ListRenderItemInfo<Comment>) => (
                    <Box>
                      <Box py={2}>
                        <CommentCard {...item} />
                      </Box>
                      <Divider />
                    </Box>
                  )}
                  ListFooterComponent={
                    data?.pages && data?.pages > 1 ? (
                      <HStack justifyContent={'center'} mt={5} mb={5}>
                        <Pagination
                          defaultPage={1}
                          page={
                            data?.page ||
                            Number.parseInt(String(queries.page), 10)
                          }
                          count={data?.pages}
                          onChange={(event, value) =>
                            setQueries({...queries, page: value})
                          }
                        />
                      </HStack>
                    ) : undefined
                  }
                />
              </Box>
            </Box>
          </Container>
        </KeyboardAvoidingView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export type FloatingCommentProps = {
  comicId: string;
  hideLabel?: boolean;
  size?: IBoxProps['size'];
};

export const FloatingComment: React.FC<FloatingCommentProps> = ({
  comicId,
  hideLabel,
  size,
}) => {
  const {isOpen, onClose, onToggle} = useDisclose(false);
  const isFocused = useIsFocused();
  return (
    <Box>
      {isFocused ? (
        <Fab
          display={comicId ? 'flex' : 'none'}
          position="absolute"
          right={{base: 5, md: 10}}
          bottom={{base: 5, md: 10}}
          onPress={onToggle}
          label={hideLabel ? undefined : 'Comments'}
          icon={<Icon as={VectorIcon} size={size} name="chatbubble-outline" />}
        />
      ) : null}
      <FloatingCommentContent
        isOpen={isOpen}
        onClose={onClose}
        comicId={comicId}
      />
    </Box>
  );
};
