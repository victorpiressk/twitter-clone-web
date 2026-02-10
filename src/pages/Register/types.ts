export type RegisterFormData = {
  name: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type RegisterFormErrors = {
  name?: string
  email?: string
  username?: string
  password?: string
  confirmPassword?: string
  general?: string
}
