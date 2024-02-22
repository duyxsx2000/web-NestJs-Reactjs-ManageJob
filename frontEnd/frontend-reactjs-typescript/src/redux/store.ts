import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from '../auth/authSlice'
import jobsReducer from './slices/jobsSlice'
import  statusDisplayReducer  from './slices/statusDisplaySloce'
import userSReducer from './slices/usersSlice'
import dashboardReducer from './slices/dashboardSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobsReducer,
    dashboard: dashboardReducer,
    display: statusDisplayReducer,
    users: userSReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch