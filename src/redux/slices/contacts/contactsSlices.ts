import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../../api/api"
import { store } from "../../store"
import { IContactsInitState, IFilter } from "../../../components/Contacts/types"

const initialState: IContactsInitState = {
  data: [],
  current_page: 1,
  limit: 30,
  total_pages: 0,
  progress_id: 0,
  isLoading: false,
  error: "",
}

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (params: IFilter, { rejectWithValue }) => {
    try {
      const res = await api.contacts.getContacts(
        store.getState().contacts.current_page,
        store.getState().contacts.limit,
        params,
      )
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContacts",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.contacts.deleteContacts(id)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const changeContact = createAsyncThunk(
  "contacts/changeContact",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.contacts.changeContact(params)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(error.response.data)
    }
  },
)

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.contacts.addContact(params)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(error.response.data)
    }
  },
)

export const importFile = createAsyncThunk(
  "contacts/importFile",
  async (params: FormData, { rejectWithValue }) => {
    try {
      const res = await api.contacts.importContacts(params)
      return res.data.progress_id
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(error.response.data)
    }
  },
)

const handleloading = (state: IContactsInitState) => {
  state.isLoading = true
}

const handleError = (
  state: IContactsInitState,
  action: PayloadAction<string>,
) => {
  state.isLoading = false
  state.error = action.payload
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setLoading: handleloading,
    setError: handleError,
    setLimit: (state: IContactsInitState, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setCurrentPage: (
      state: IContactsInitState,
      action: PayloadAction<number>,
    ) => {
      state.current_page = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      console.log("action.payload", action.payload)
      state.data = action.payload.data
      state.total_pages = action.payload.meta.pagination.total_pages
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(deleteContacts.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(importFile.fulfilled, (state, action) => {
      state.progress_id = action.payload
    })

    builder.addCase(changeContact.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { setLoading, setError, setLimit, setCurrentPage } =
  contactsSlice.actions

export default contactsSlice.reducer
