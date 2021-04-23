// clear listing of params for APIs

export type ListUsers = {
  status?: string
}

export type CreateUser = {
  email: string
  username: string
  firstname: string
  lastname: string
  password: string
  status: string
  interests: Array<string>
}

export type Login = {
  emailOrUsername: string
  password: string
}

export type GetUser = {
  userId: string
}

export type DeleteUser = {
  userId: string
}

export type AddInterests = {
  userId: string
  interestIds: string[]
}

export type ResetPassword = {
  email: string
}

export type SetPassword = {
  tokenId: string
  password: string
}

export type UpdateUserInfo = {
  userId: string
  password: string
  firstName: string
  lastName: string
}
