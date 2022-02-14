import axios from './_axios';
import {PROFILE} from './_endpoints';

import {User} from 'types/auth';
import {UpdateProfileProps} from 'types/apis';

export const getProfile = async (): Promise<User> => {
  const result = axios
    .request<User>({
      method: 'get',
      url: PROFILE,
    })
    .then(res => res.data);
  return result;
};

export const updateProfile = async (
  data: Partial<UpdateProfileProps>,
): Promise<User> => {
  const result = axios
    .request<User>({
      method: 'patch',
      url: PROFILE,
      data: data,
    })
    .then(res => res.data);
  return result;
};
