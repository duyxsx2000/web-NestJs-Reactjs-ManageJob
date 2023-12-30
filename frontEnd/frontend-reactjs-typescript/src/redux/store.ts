import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from '../auth/authSlice'
import jobsReducer from './slices/jobsSlice'
import  statusDisplayReducer  from './slices/statusDisplaySloce'
import userSReducer from './slices/usersSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobsReducer,
    display: statusDisplayReducer,
    users: userSReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch