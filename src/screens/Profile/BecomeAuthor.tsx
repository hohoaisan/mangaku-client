import useAuth from 'hooks/useAuth';
import {Button, Box, Link} from 'native-base';
import React from 'react';
import {EnumRole} from 'types/enum';

const CREATOR_HOST = process.env.REACT_APP_CREATOR_HOST;

const BecomeAuthor: React.FC = () => {
  const auth = useAuth();

  if (auth.user?.role === EnumRole.AUTHOR) {
    return (
      <Box>
        <Link href={CREATOR_HOST} isExternal>
          <Button>Manage your comics</Button>
        </Link>
      </Box>
    );
  }

  if (auth.user?.role === EnumRole.USER) {
    return (
      <Box>
        <Link href={CREATOR_HOST} isExternal>
          <Button>Become an author</Button>
        </Link>
      </Box>
    );
  }

  return null;
};

export default BecomeAuthor;
