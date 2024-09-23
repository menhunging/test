import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../../api/api"
import {
  IEventsInitState,
  IEventsRequest,
  IEventsResponse,
} from "../../../components/Events/types"
import { store, useAppDispatch } from "../../store"
import moment from "moment"

const initialState: IEventsInitState = {
  data: [],
  new_event_id: null,
  new_event_img: {
    id: 0,
    file_path: "",
  },
  preview: {},
  current_page: 1,
  total_pages: 0,
  total: 0,
  isLoading: false,
  error: "",
  currentLang: "",
  //
  totalEventsCount: 0,
}

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (params: IEventsRequest, { rejectWithValue }) => {
    try {
      const res = await api.events.events(
        store.getState().events.current_page,
        params,
      )
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const getPreview = createAsyncThunk(
  "events/getPreview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.events.getPreview()
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (params, thunkAPI) => {
    let formatDate = moment(params.event_created_date).format("Y-M-D")
    let formatTime = moment(params.event_created_date).format("HH:mm")

    // event_created_date: "2023-10-31",
    // event_created_time: "12:00",

    try {
      let data = {
        orientation: "v",
        name: params.name,
        host_name: "host",
        event_created_date: formatDate,
        event_created_time: formatTime,
        address: {
          address: params.address.address,
          lat: params.address.lat,
          lng: params.address.lng,
        },
        text_style: {
          font_family: "Oxygen, sans-serif",
          font_size: "2x 1",
          font_style: {
            textBold: false,
            textItalic: false,
            textUnderline: false,
          },
          color: "#000",
          text_align: "center",
        },
        text_position: "flex-start",
        invitation_show_qr_code: params.invitation_show_qr_code,
      }

      console.log("data --- ", data)

      const res = await api.events.createEvent(data)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const loadFileEvent = createAsyncThunk(
  "events/loadFileEvent",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.events.loadImgEvent(params)
      return res.data.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const deleteFileEvent = createAsyncThunk(
  "events/deleteFileEvent",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.events.deleteImgEvent(id)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return rejectWithValue(message)
    }
  },
)

export const eventDesign = createAsyncThunk(
  "events/eventDesign",
  async (params, thunkAPI) => {
    try {
      const res = await api.events.eventDesign(params)
      return res.data
    } catch (error: any) {
      let { message } = error.response.data
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// helper

const handleloading = (state: IEventsInitState) => {
  state.isLoading = true
}

const handleError = (
  state: IEventsInitState,
  action: PayloadAction<string>,
) => {
  state.isLoading = false
  state.error = action.payload
}

// slice

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setLoading: handleloading,
    setError: handleError,
    clearImg: (state: IEventsInitState) => {
      state.new_event_img = {
        id: 0,
        file_path: "",
      }
    },
    clearEvents: (state: IEventsInitState) => {
      state.data = []
    },
    setCurrentPage: (
      state: IEventsInitState,
      action: PayloadAction<number>,
    ) => {
      state.current_page = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.current_page = action.payload.meta.pagination.current_page
      state.total_pages = action.payload.meta.pagination.total_pages
      state.total = action.payload.meta.pagination.total
      state.data = [...action.payload.data]
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.new_event_id = action.payload.event_id
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(eventDesign.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(loadFileEvent.fulfilled, (state, action) => {
      state.new_event_img.id = action.payload.id
      state.new_event_img.file_path = action.payload.file_path
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(deleteFileEvent.fulfilled, (state, action) => {
      state.new_event_img.id = 0
      state.new_event_img.file_path = ""
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(getPreview.fulfilled, (state, action) => {
      state.currentLang = localStorage.getItem("i18nextLng") || null

      // if (state.currentLang === "en") {
      //   state.preview = { ...action.payload.en }
      // }

      // if (state.currentLang === "ar") {
      //   state.preview = { ...action.payload.ar }
      // }

      state.preview = { ...action.payload }
      state.isLoading = false
      state.error = ""
    })
  },

  // extraReducers: {
  //   [getEvents.pending.type]: handleloading,
  //   [createEvent.pending.type]: handleloading,
  //   [loadFileEvent.pending.type]: handleloading,
  //   [deleteFileEvent.pending.type]: handleloading,
  //   [getPreview.pending.type]: handleloading,
  //   [eventDesign.pending.type]: handleloading,

  //   [getEvents.rejected.type]: handleError,
  //   [createEvent.rejected.type]: handleError,
  //   [loadFileEvent.rejected.type]: handleError,
  //   [deleteFileEvent.rejected.type]: handleError,
  //   [getPreview.rejected.type]: handleError,
  //   [eventDesign.rejected.type]: handleError,

  //   [getEvents.fulfilled.type]: (
  //     state: IEventsInitState,
  //     action: PayloadAction<IEventsResponse>,
  //   ) => {
  //     state.current_page = action.payload.meta.pagination.current_page
  //     state.total_pages = action.payload.meta.pagination.total_pages
  //     state.total = action.payload.meta.pagination.total
  //     state.data = [...action.payload.data]
  //     state.isLoading = false
  //     state.error = ""
  //   },

  //   [createEvent.fulfilled.type]: (
  //     state: IEventsInitState,
  //     action: PayloadAction<IEventsResponse>,
  //   ) => {
  //     state.isLoading = false
  //     state.error = ""
  //   },

  //   [loadFileEvent.fulfilled.type]: (
  //     state: IEventsInitState,
  //     action: PayloadAction<IEventsResponse>,
  //   ) => {
  //     state.new_event_img.id = action.payload.id
  //     state.new_event_img.file_path = action.payload.file_path
  //     state.isLoading = false
  //     state.error = ""
  //   },

  //   [deleteFileEvent.fulfilled.type]: (
  //     state: IEventsInitState,
  //     action: PayloadAction<IEventsResponse>,
  //   ) => {
  //     state.new_event_img.id = 0
  //     state.new_event_img.file_path = ""
  //     state.isLoading = false
  //     state.error = ""
  //   },

  //   [getPreview.fulfilled.type]: (
  //     state: IEventsInitState,
  //     action: PayloadAction<IEventsResponse>,
  //   ) => {
  //     state.currentLang = localStorage.getItem("i18nextLng") || null

  //     if (state.currentLang === "en") {
  //       state.preview = { ...action.payload.en }
  //     }

  //     if (state.currentLang === "ar") {
  //       state.preview = { ...action.payload.ar }
  //     }

  //     state.isLoading = false
  //     state.error = ""
  //   },

  //   [eventDesign.fulfilled.type]: (
  //     state: IEventsInitState,
  //     action: PayloadAction<IEventsResponse>,
  //   ) => {
  //     state.isLoading = false
  //     state.error = ""
  //   },
  // },
})

export const { setLoading, setError, setCurrentPage, clearEvents, clearImg } =
  eventsSlice.actions

export default eventsSlice.reducer
