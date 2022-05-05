export interface IUserSignUp {
  name: string;
  login: string;
  password: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
}

export interface IUser {
  name: string;
  login: string;
  id: string;
  token: string;
}

export interface IGetUser {
  name: string;
  login: string;
  id: string;
}
