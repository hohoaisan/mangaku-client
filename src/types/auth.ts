export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  emailVerified: boolean;
};

export type Token = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};
