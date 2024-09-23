export interface IEvent {
  event_id: number
  status: number
  name: string
  event_created_date: string
  pattern: string
  pattern_id: number
  count_all_contacts: number
  count_contacts_ignore: number
  count_contacts_going: number
  count_contacts_decline: number
}

export interface IEventsInitState {
  data: IEvent[]
  new_event_id: number | null
  current_page: number
  total: number
  total_pages: number
  totalEventsCount: number
  isLoading: boolean
  error: string
  new_event_img: {
    id: number
    file_path: string
  }
  preview: {}
  currentLang: string | null
}

export interface IEventsRequest {
  current_page?: number
  sort: string
  searchValue: string
  status: string
}

export interface IEventsResponse {
  data: IEvent[]
  meta: {
    pagination: {
      current_page: number
      total_pages: number
      total: number
    }
  }
}

export interface IEvents {
  events: IEvent[]
}

export interface IFilter {
  filter: {
    sort: string
    searchValue: string
    status: string
  }
  setFilter: React.Dispatch<
    React.SetStateAction<{
      sort: string
      searchValue: string
      status: string
    }>
  >
}
