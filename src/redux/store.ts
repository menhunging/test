import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authSlice from "./slices/auth/authSlice"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import eventsSlice from "./slices/events/eventsSlice"
import contactsSlices from "./slices/contacts/contactsSlices"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    contacts: contactsSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // custom Hook TS
export const useAppDispatch = () => useDispatch<AppDispatch>() // custom Hook TS
