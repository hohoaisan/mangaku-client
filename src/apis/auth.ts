import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import * as AuthAPI from './_endpoints/auth';
import {
  RefreshTokenApiProps,
  RefreshTokenApiResponse,
  LoginApiProps,
  LoginApiResponse,
} from 'types/apis';

export const refreshAccessToken = async (
  props: RefreshTokenApiProps,
  AxiosOptions?: AxiosRequestConfig,
): Promise<RefreshTokenApiResponse> => {
  const result = axios
    .request<RefreshTokenApiResponse>({
      ...AxiosOptions,
      url: AuthAPI.TOKEN_REFRESH,
      data: props.refreshToken,
    })
    .then(res => res.data);
  return result;
};

export const login = async (
  props: LoginApiProps,
  AxiosOptions?: AxiosRequestConfig,
): Promise<LoginApiResponse> => {
  const result = axios
    .request<LoginApiResponse>({
      ...AxiosOptions,
      method: 'post',
      url: AuthAPI.LOGIN,
      data: {
        email: props.email,
        password: props.password,
      },
    })
    .then(res => res.data);
  return result;
};

export const logout = async (
  props: RefreshTokenApiProps,
  AxiosOptions?: AxiosRequestConfig,
): Promise<never> => {
  const result = axios
    .request<never>({
      ...AxiosOptions,
      method: 'post',
      url: AuthAPI.LOGOUT,
      data: {
        refreshToken: props.refreshToken,
      },
    })
    .then(res => res.data);
  return result;
};
