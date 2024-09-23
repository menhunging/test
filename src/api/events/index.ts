import enpoints from "../endpoints"
import { axiosInstance } from "../instance"
import { AxiosPromise } from "axios"

import { IEventsRequest, IEventsResponse } from "../../components/Events/types"

export const events = (
  currentPage: number,
  params: { sort: string; searchValue: string; status: string },
): AxiosPromise<IEventsResponse> => {
  let sorted = ""
  let search = ""
  let status = ""

  switch (params.sort) {
    case "sortedBy":
      sorted = "&sortedBy=desc"
      break
    case "orderBy":
      sorted = "&orderBy=event_created_date"
      break
    default:
      sorted = ""
      break
  }

  if (params.status !== "") {
    status = `status:${params.status}`
  }

  if (params.searchValue !== "") {
    search = `;name:${params.searchValue}&searchJoin=and`
  }

  return axiosInstance.get(
    enpoints.EVENTS.GET +
      `?page=${currentPage}${sorted}&search=${status}${search}`,
  )
}

export const createEvent = (params) => {
  return axiosInstance.post(enpoints.EVENTS.UPDATE, params)
}

export const loadImgEvent = (params) => {
  return axiosInstance.post(enpoints.EVENTS.LOAD_IMG, params)
}

export const deleteImgEvent = (id) => {
  return axiosInstance.delete(enpoints.EVENTS.LOAD_IMG + `/${id}`)
}

export const getPreview = () => {
  return axiosInstance.get(enpoints.EVENTS.PREVIEW)
}

export const eventDesign = (params) => {
  return axiosInstance.post(enpoints.EVENTS.DESIGN, params)
}
