export type LoginFormData = {
  emailOrUsername: string
  password: string
}

export type LoginFormErrors = {
  emailOrUsername?: string
  password?: string
  general?: string
}
