import axios from "axios"
import endpoints from "./endpoints"

export const axiosInstance = axios.create({
  baseURL: "https://dev-api.mazoom.sa/api",
})

const urlsSkipAuth = [
  endpoints.AUTH.LOGIN,
  endpoints.AUTH.PHONESTEP1,
  endpoints.AUTH.PHONESTEP2,
  endpoints.AUTH.LOGOUT,
]

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config
  }

  const accessToken = localStorage.getItem("token") || null

  if (accessToken) {
    const autharization = `Bearer ${accessToken}`

    config.headers = {
      ...config.headers,
      authorization: autharization,
    }
  }

  return config
})

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url && config.url === endpoints.EVENTS.PREVIEW) {
    config.headers = {
      ...config.headers,
      Accept: "application/x..v2+json",
    }
  }

  if (config.url && config.url.includes(endpoints.EVENTS.GET)) {
    if (config.data) {
      return config
    }

    config.headers = {
      ...config.headers,
      Accept: "application/x..v2+json",
    }
  }

  if (config.url && config.url.includes(endpoints.EVENTS.LOAD_IMG)) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    }
  }

  if (config.url && config.url.includes(endpoints.CONTACTS.UP)) {
    if (config.data) {
      return config
    }

    config.headers = {
      ...config.headers,
      Accept: "application/x..v2+json",
    }
  }

  if (config.url && config.url === endpoints.CONTACTS.IMPORT) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
      // "Content-Language": "ar, en",
    }
  }

  return config
})
