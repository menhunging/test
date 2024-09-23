import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IStatus } from "../../../types/types"
import api from "../../../api/api"
import {
  IAuthInitState,
  IAuthenticationResponse,
  IForgotRequest,
  ILoginGoogleResponse,
  ILoginRequest,
  ILoginResponse,
  IPhoneStepOneRequest,
  IPhoneStepTwoRequest,
  IRegisterRequest,
} from "../../../components/Auth/types"

const initialState: IAuthInitState = {
  accessToken: "",
  login: "",
  phone: "",
  email: "",
  first_name: "",
  last_name: "",
  status: null,
  isLoading: false,
  isAuth: false,
  confirmed: false,
  balance: 0,
  error: "",
  errorsInfo: {},
  lang: "en",
}

// login

export const loginEmail = createAsyncThunk(
  "authorization/loginEmail",
  async (params: ILoginRequest, { rejectWithValue }) => {
    try {
      const res = await api.auth.login(params)
      return res.data.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const authentication = createAsyncThunk(
  "authorization/authentication",
  async (params: IAuthenticationResponse, { rejectWithValue }) => {
    try {
      const res = await api.auth.profile(params)
      return res.data.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const loginPhoneStepOne = createAsyncThunk(
  "authorization/loginPhoneStepOne",
  async (phone: IPhoneStepOneRequest, { rejectWithValue }) => {
    try {
      const res = await api.auth.loginPhoneStepOne(phone)
      return phone.phone
    } catch (error: any) {
      let { message } = error.response.data.message
      return rejectWithValue(message)
    }
  },
)

export const loginPhoneStepTwo = createAsyncThunk(
  "authorization/loginPhoneStepTwo",
  async (data: IPhoneStepTwoRequest, { rejectWithValue }) => {
    try {
      const res = await api.auth.loginPhoneStepTwo(data)

      return res.data
    } catch (error: any) {
      let { message } = error.response.data.message
      return rejectWithValue(message)
    }
  },
)

export const loginGoogle = createAsyncThunk(
  "authorization/loginGoogle",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.auth.google(params)

      console.log("res - ", res.data.data)

      return res.data.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

// SIGN-UP

export const registerUser = createAsyncThunk(
  "authorization/registerUser",
  async (data: IRegisterRequest, { rejectWithValue }) => {
    try {
      const res = await api.auth.register(data)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

// password

export const forgotPassword = createAsyncThunk(
  "authorization/forgotPassword",
  async (email: IForgotRequest, { rejectWithValue }) => {
    try {
      const res = await api.auth.forgot({ email })
      return res
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

// logout

export const logoutUser = createAsyncThunk(
  "authorization/logoutUser",
  async () => {
    try {
      // const res = await api.auth.logout()
      // return res
      return true
    } catch (event: any) {
      console.error("error catch", event)
    }
  },
)

// helper

const handleloading = (state: IAuthInitState) => {
  state.isLoading = true
}

const handleError = (state: IAuthInitState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
}

const handleErrorProfile = (
  state: IAuthInitState,
  action: PayloadAction<string>,
) => {
  state.isLoading = false
  state.error = action.payload
}

// slice

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setLoading: handleloading,
    setError: handleError,
    setLanguage: (state: IAuthInitState, action: PayloadAction<string>) => {
      state.lang = action.payload
    },

    setStatus(state: IAuthInitState, action: PayloadAction<IStatus>) {
      state.status = action.payload
    },

    setLoginPhoneStepOne: (state: IAuthInitState) => {
      state.status = "PHONE-STEP-ONE"
      state.isLoading = false
    },

    setLoginPhoneStepTwo: (state: IAuthInitState) => {
      state.status = "PHONE-STEP-TWO"
      state.isLoading = false
    },
  },

  extraReducers: {
    [loginEmail.pending.type]: handleloading,
    [authentication.pending.type]: handleloading,
    [forgotPassword.pending.type]: handleloading,
    [logoutUser.pending.type]: handleloading,
    [registerUser.pending.type]: handleloading,
    [loginPhoneStepOne.pending.type]: handleloading,
    [loginPhoneStepTwo.pending.type]: handleloading,
    [loginGoogle.pending.type]: handleloading,

    [loginEmail.rejected.type]: handleError,
    [forgotPassword.rejected.type]: handleError,
    [logoutUser.rejected.type]: handleError,
    [registerUser.rejected.type]: handleError,
    [loginPhoneStepOne.rejected.type]: handleError,
    [loginPhoneStepTwo.rejected.type]: handleError,
    [loginGoogle.rejected.type]: handleError,

    [authentication.rejected.type]: handleErrorProfile,

    [loginEmail.fulfilled.type]: (
      state: IAuthInitState,
      action: PayloadAction<ILoginResponse>,
    ) => {
      let { token, first_name, last_name, email, phone, balance, confirmed } =
        action.payload

      localStorage.setItem("token", token)

      state.status = "LOGIN-SUCCESS"
      state.accessToken = token
      state.confirmed = !!confirmed
      state.balance = balance
      state.phone = phone
      state.email = email
      state.first_name = first_name
      state.last_name = last_name
      state.isLoading = false
      state.isAuth = true
      state.error = null
    },

    [authentication.fulfilled.type]: (
      state: IAuthInitState,
      action: PayloadAction<IAuthenticationResponse>,
    ) => {
      let { email, phone, first_name, last_name, balance, confirmed } =
        action.payload

      state.accessToken = localStorage.getItem("token") || null

      state.confirmed = !!confirmed
      state.balance = balance
      state.phone = phone
      state.email = email
      state.first_name = first_name
      state.last_name = last_name
      state.isLoading = false
      state.isAuth = true
      state.error = null
    },

    [loginGoogle.fulfilled.type]: (
      state: IAuthInitState,
      action: PayloadAction<ILoginGoogleResponse>,
    ) => {
      let { email, phone, first_name, last_name, token, balance } =
        action.payload

      localStorage.setItem("token", token)

      state.accessToken = token
      state.balance = balance
      state.phone = phone
      state.email = email
      state.first_name = first_name
      state.last_name = last_name
      state.isLoading = false
      state.isAuth = true
      state.error = null
    },

    [forgotPassword.fulfilled.type]: (state: IAuthInitState) => {
      state.status = "FORGOT-PASSWORD-SUCCESS"
      state.isLoading = false
      state.error = null
    },

    [logoutUser.fulfilled.type]: (state: IAuthInitState) => {
      state.accessToken = null
      state.isLoading = false
      state.isAuth = false
      state.error = null
      state.login = null
      state.status = null

      localStorage.removeItem("token")
    },

    [registerUser.fulfilled.type]: (
      state: IAuthInitState,
      action: PayloadAction<string>,
    ) => {
      console.log("register", action)

      state.status = "SIGNUP-SUCCESS"
      state.isLoading = false
      state.isAuth = false
      state.error = null
    },

    [loginPhoneStepOne.fulfilled.type]: (
      state: IAuthInitState,
      action: PayloadAction<string>,
    ) => {
      console.log("loginPhoneStepOne: ", action.payload)
      state.phone = action.payload
      state.status = "PHONE-STEP-TWO"
      state.isLoading = false
    },

    [loginPhoneStepTwo.fulfilled.type]: (
      state: IAuthInitState,
      action: PayloadAction<any>,
    ) => {
      console.log("loginPhoneStepTwo: ", action.payload)

      let { result, user } = action.payload

      if (result === 5) {
        localStorage.setItem("token", user.token)

        state.status = "LOGIN-SUCCESS"
        state.accessToken = user.token
        state.phone = user.phone
        state.isLoading = false
        state.isAuth = true
        state.error = null
      } else {
        // state.status = "PHONE-STEP-TWO"
        state.isLoading = false
        state.isAuth = false
        state.error = "Authorisation Error"
      }
    },
  },
})

export const {
  setLoading,
  setError,
  setStatus,
  setLanguage,
  setLoginPhoneStepOne,
  setLoginPhoneStepTwo,
} = authSlice.actions

export default authSlice.reducer
