import useAuth from 'hooks/useAuth';
import {Button, Box, Link} from 'native-base';
import React from 'react';
import {EnumRole} from 'types/enum';

import strings from 'configs/strings';
const {
  pages: {profile: profilePageStrings},
} = strings;

const CREATOR_HOST = process.env.REACT_APP_CREATOR_HOST;

const BecomeAuthor: React.FC = () => {
  const auth = useAuth();

  if (auth.user?.role === EnumRole.AUTHOR) {
    return (
      <Box>
        <Link href={CREATOR_HOST} isExternal>
          <Button>{profilePageStrings.author.manageComic}</Button>
        </Link>
      </Box>
    );
  }

  if (auth.user?.role === EnumRole.USER) {
    return (
      <Box>
        <Link href={CREATOR_HOST} isExternal>
          <Button>{profilePageStrings.author.becomeAuthor}</Button>
        </Link>
      </Box>
    );
  }

  return null;
};

export default BecomeAuthor;
