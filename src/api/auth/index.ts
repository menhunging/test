import enpoints from "../endpoints"
import { axiosInstance } from "../instance"
import { AxiosPromise } from "axios"
import {
  ILoginRequest,
  IRegisterRequest,
  ILoginResponse,
  IForgotRequest,
  IPhoneStepOneRequest,
  IPhoneStepOneResponse,
  IPhoneStepTwoRequest,
  IPhoneStepTwoResponse,
} from "../../components/Auth/types"

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(enpoints.AUTH.LOGIN, params)

export const register = (
  params: IRegisterRequest,
): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(enpoints.AUTH.REGISTER, params)

export const loginPhoneStepOne = (
  params: IPhoneStepOneRequest,
): AxiosPromise<IPhoneStepOneResponse> =>
  axiosInstance.post(enpoints.AUTH.PHONESTEP1, params)

export const loginPhoneStepTwo = (
  params: IPhoneStepTwoRequest,
): AxiosPromise<IPhoneStepTwoResponse> =>
  axiosInstance.post(enpoints.AUTH.PHONESTEP2, params)

export const logout = (): AxiosPromise =>
  axiosInstance.get(enpoints.AUTH.LOGOUT)

export const forgot = (params: IForgotRequest) =>
  axiosInstance.post(enpoints.AUTH.FORGOT, params)

export const profile = (params = null) => axiosInstance.post(enpoints.AUTH.PROFILE,params)

export const google = (params) =>
  axiosInstance.post(enpoints.AUTH.GOOGLE, params)

export const confirmed = () => axiosInstance.get(enpoints.AUTH.CONFIRMED)
