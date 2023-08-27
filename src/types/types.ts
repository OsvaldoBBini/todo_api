export interface INewUser {
  name: string,
  email: string,
  password: string
}

export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  profilePicture: string | null
}

export interface IUserLogin {
  email: string,
  password: string
}
