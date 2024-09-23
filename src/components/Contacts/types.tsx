export interface IContact {
  id: number
  first_name: number
  last_name: number
  suffix: string
  phone: string
  email: string
}

export interface IContactsInitState {
  data: IContact[]
  current_page: number
  limit: number
  total_pages: number
  progress_id: number
  isLoading: boolean
  error: string
}

export interface iFile {
  name: string
  size: number
  type: string
}

export interface IFilter {
  sort: string
  searchValue: string
}

export interface iContactsBody {
  guests: IContact[]
  dataLoadMore: IContact[]
  current_page: number
  limit: number
  filter: IFilter
  total_pages: number
  addShow: boolean
  importShow: boolean
  deleteQuest: (id: number) => void
  setDataLoadMore: (value: never[]) => void
  setFilter: (filter: IFilter) => void
  setAddShow: (value: boolean) => void
  setImportShow: (value: boolean) => void
}
