// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
// import counterReducer from "../features/counter/counterSlice"

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postApi } from '../services/PostServices/Post'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [postApi.reducerPath]: postApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)