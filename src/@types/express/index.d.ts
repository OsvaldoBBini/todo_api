declare namespace Express {
  export interface Request {
    userId: string,
    profilePicturePath: string,
    email: string
  }
}
