export interface INewUser {
  name: string,
  email: string,
  password: string
}

export interface IUserInfos {
  id: string
  name: string,
  email: string,
  profilePicture: string,
}

export interface IUpdateUserInfos {
  name: string,
  email: string,
  profilePicture: string,
}

export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  profilePicture: string
}

export interface IUserLogin {
  email: string,
  password: string
}

export interface IResetCode {
  email: string,
  code: string,
  expirationTime: Date
}
