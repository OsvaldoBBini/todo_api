export interface INewUser {
  name: string,
  email: string,
  password: string
}

export interface IUserInfos {
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


export interface INewFolder {
  userId: string,
  name: string,
  description?: string
}

export interface IUpdateFolderInfos {
  name: string,
  description: string
}

export interface INewTask {
  userId: string,
  folderId: string,
  description: string,
  status?: boolean
}

export interface IUpdateTaskInfo {
  description: string,
  status: boolean
}
