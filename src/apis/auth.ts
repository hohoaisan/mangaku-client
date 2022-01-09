import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import * as Endpoints from './_endpoints';
import {
  RefreshTokenApiProps,
  RefreshTokenApiResponse,
  LoginApiProps,
  LoginApiResponse,
  RegisterApiProps,
} from 'types/apis';

export const refreshAccessToken = async (
  props: RefreshTokenApiProps,
  AxiosOptions?: AxiosRequestConfig,
): Promise<RefreshTokenApiResponse> => {
  const result = axios
    .request<RefreshTokenApiResponse>({
      ...AxiosOptions,
      url: Endpoints.TOKEN_REFRESH,
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
      url: Endpoints.LOGIN,
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
      url: Endpoints.LOGOUT,
      data: {
        refreshToken: props.refreshToken,
      },
    })
    .then(res => res.data);
  return result;
};

export const register = async (
  props: RegisterApiProps,
  AxiosOptions?: AxiosRequestConfig,
): Promise<never> => {
  const result = axios
    .request<never>({
      ...AxiosOptions,
      method: 'post',
      url: Endpoints.REGISTER,
      data: props,
    })
    .then(res => res.data);
  return result;
};
