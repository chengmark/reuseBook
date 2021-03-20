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
  interest: Array<string>
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
