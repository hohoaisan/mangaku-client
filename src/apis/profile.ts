import axios from './_axios';
import * as ProfileAPI from './_endpoints/profile';

import {User} from 'types/auth';

export const getProfile = async (): Promise<User> => {
  const result = axios
    .request<User>({
      method: 'get',
      url: ProfileAPI.PROFILE,
    })
    .then(res => res.data);
  return result;
};
