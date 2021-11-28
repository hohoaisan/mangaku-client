import AxiosClient from './index';
import TokenService from 'services/token.service';
import AuthService from 'services/auth.service';

import {LOGIN, TOKEN_REFRESH} from 'apis/_endpoints';
import httpStatus from 'http-status';

export const setupAxiosInterceptors = (): void => {
  AxiosClient.interceptors.request.use(
    async config => {
      const token = await TokenService.getAccessToken();
      if (config.headers && token) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
      }
      return config;
    },
    error => Promise.reject(error),
  );

  AxiosClient.interceptors.response.use(
    response => response,
    async err => {
      const originalConfig = err.config;

      const refreshToken = await TokenService.getRefreshToken();

      if (
        refreshToken &&
        originalConfig.url !== LOGIN &&
        err?.response?.status === httpStatus.UNAUTHORIZED &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          const result = await AxiosClient({
            ...originalConfig,
            method: 'post',
            url: TOKEN_REFRESH,
            data: {
              refreshToken,
            },
          });
          const accessToken = result?.data?.access?.token as string;
          TokenService.updateTokens({accessToken});
          // Retry the request
          originalConfig.headers.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : '';
          return AxiosClient(originalConfig);
        } catch (_err) {
          return Promise.reject(_err);
        }
      }

      if (
        refreshToken &&
        originalConfig.url !== LOGIN &&
        err?.response?.status === httpStatus.UNAUTHORIZED &&
        originalConfig._retry
      ) {
        AuthService.logout({tokenExpired: true});
      }

      return Promise.reject(err);
    },
  );
};
