import {User, Token, Tokens} from './auth';

export type RefreshTokenApiProps = {
  refreshToken: string;
};

export type RefreshTokenApiResponse = {
  access: Token;
  refresh: Token;
};

export type LoginApiProps = {
  email: string;
  password: string;
};

export type LoginApiResponse = {
  user: User;
  tokens: Tokens;
};

export type AccessTokenApiProps = {
  accessToken: string;
};

export type ResponseErrorData = {
  code: number;
  message: string;
};
