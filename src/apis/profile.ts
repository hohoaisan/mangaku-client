import axios from './_axios';
import {PROFILE} from './_endpoints';

import {User} from 'types/auth';

export const getProfile = async (): Promise<User> => {
  const result = axios
    .request<User>({
      method: 'get',
      url: PROFILE,
    })
    .then(res => res.data);
  return result;
};
