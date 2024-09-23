import { IStatus } from "../../types/types"

// ----- Auth types

export interface IAuthInitState {
  accessToken: string | null
  login: string | null
  phone: string | null
  email: string | null
  first_name: string | null
  last_name: string | null
  status: IStatus
  confirmed: boolean
  isLoading: boolean
  isAuth: boolean
  balance: number
  error: string | any | null
  errorsInfo: {}
  lang: string
}

// login

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  email: string
  first_name: string
  last_name: string
  phone: string
  balance: number
  confirmed: number
}

export interface IAuthenticationResponse {
  email: string
  first_name: string
  language: string
  last_name: string
  phone: string
  balance: number
  confirmed: number
}

export interface ILoginGoogleResponse {
  id: number
  email: string
  first_name: string
  last_name: string
  language: string
  phone: string
  token: string
  balance: number
}

// phone step 1

export interface IPhoneStepOneRequest {
  phone: string | null
}

export type IPhoneStepOneResponse = any

// phone step 2

export interface IPhoneStepTwoRequest {
  phone: string | null
  otp: string | null
}

export type IPhoneStepTwoResponse = string

// register

export interface IRegisterRequest {
  email: string
  phone: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
}

// forgot

export type IForgotRequest = {}
