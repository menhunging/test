import enpoints from "../endpoints"
import { axiosInstance } from "../instance"

export const getContacts = (
  currentPage: number,
  limit: number,
  params: { sort: string; searchValue: string },
) => {
  let search = ""

  if (params.searchValue !== "") {
    search = `&search=first_name:${params.searchValue};last_name:${params.searchValue};phone:${params.searchValue}`
  }

  return axiosInstance.get(
    enpoints.CONTACTS.GET +
      `?page=${currentPage}${params.sort}&limit=${limit}${search}`,
  )
}

export const deleteContacts = (id: number) => {
  return axiosInstance.delete(enpoints.CONTACTS.UP + `${id}`)
}

export const changeContact = (params: {
  id: number
  first_name: string
  last_name: string
  suffix: string
  email: string
  phone: string
}) => {
  let { id, first_name, last_name, suffix, email, phone } = params

  return axiosInstance.put(enpoints.CONTACTS.UP + `${id}`, {
    first_name,
    last_name,
    suffix,
    email,
    phone,
  })
}

export const addContact = (params: {
  first_name: string
  last_name: string
  suffix: string
  email: string
  phone: string
}) => {
  let { first_name, last_name, suffix, email, phone } = params

  return axiosInstance.post(enpoints.CONTACTS.CREATE, {
    first_name,
    last_name,
    suffix,
    email,
    phone,
  })
}

export const importContacts = (params) => {
  return axiosInstance.post(enpoints.CONTACTS.IMPORT, params)
}
