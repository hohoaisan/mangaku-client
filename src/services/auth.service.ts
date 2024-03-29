import {store} from 'redux/store';
import axios, {AxiosError} from 'axios';
import * as AuthSlice from 'redux/auth.slice';
import TokenService from './token.service';
import ToastService from './toast.service';
import {LoginApiProps, RegisterApiProps, ResponseErrorData} from 'types/apis';
import * as authAPI from 'apis/auth';
import * as profileAPI from 'apis/profile';
import httpStatus from 'http-status';
import queryClient from 'query';

class AuthService {
  static async init(): Promise<void> {
    const accessToken = await TokenService.getAccessToken();
    const refreshToken = await TokenService.getRefreshToken();
    if (!(accessToken && refreshToken)) {
      store.dispatch(AuthSlice.loginFailed());
      return;
    }
    profileAPI
      .getProfile()
      .then(user => {
        store.dispatch(AuthSlice.loginSuccess(user));
      })
      .catch(err => {
        if (err.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
          ToastService.error('Server error');
          return;
        }
        if (err.response) {
          return;
        }
        ToastService.error(err.message);
        store.dispatch(AuthSlice.loginFailed());
      });
  }

  static async login(
    emailPassword: LoginApiProps,
  ): Promise<void | ResponseErrorData | AxiosError> {
    try {
      store.dispatch(AuthSlice.loginPending());
      const result = await authAPI.login(emailPassword);
      const {user, tokens} = result;
      const accessToken = tokens.access.token;
      const refreshToken = tokens.refresh.token;
      store.dispatch(AuthSlice.loginSuccess(user));
      ToastService.success('Logged in');
      TokenService.updateTokens({accessToken, refreshToken});
    } catch (err) {
      store.dispatch(AuthSlice.loginFailed());
      if (axios.isAxiosError(err) && err.response?.data) {
        return Promise.reject(err.response.data as ResponseErrorData);
      }
      return Promise.reject(err);
    }
    return Promise.resolve();
  }

  static async logout({tokenExpired}: {tokenExpired?: boolean} = {}): Promise<
    void | ResponseErrorData | AxiosError
  > {
    const refreshToken = await TokenService.getRefreshToken();
    if (!refreshToken) {
      return;
    }
    try {
      const result = await authAPI.logout({refreshToken});
      Promise.resolve(result);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    } finally {
      store.dispatch(AuthSlice.logout());
      ToastService.destroyAll();
      TokenService.clearTokens();
      if (tokenExpired) {
        ToastService.success('Token expired, Logged out');
      } else {
        ToastService.success('Logged out');
      }
      await queryClient.cancelMutations();
      await queryClient.cancelQueries();
      await queryClient.clear();
    }
    return Promise.resolve();
  }

  static async register(props: RegisterApiProps): Promise<void> {
    try {
      store.dispatch(AuthSlice.registerPending());
      await authAPI.register(props);
      store.dispatch(AuthSlice.registerSuccess());
      return Promise.resolve();
    } catch (err) {
      store.dispatch(AuthSlice.registerFailed());
      if (axios.isAxiosError(err) && err.response?.data) {
        return Promise.reject(err.response.data as ResponseErrorData);
      }
      return Promise.reject(err);
    }
  }
}

export default AuthService;
