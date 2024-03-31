import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from '../auth/authSlice';
import jobsReducer from './slices/jobsSlice';
import  statusDisplayReducer  from './slices/statusDisplaySloce';
import userSReducer from './slices/usersSlice';
import dashboardReducer from './slices/dashboardSlice';
import dataTaskReducer from './slices/dataTaskSlice';
import roomReducer from './slices/roomSlice'
import groupReducer from './slices/groupSlice'

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    task: dataTaskReducer,
    auth: authReducer,
    job: jobsReducer,
    dashboard: dashboardReducer,
    display: statusDisplayReducer,
    users: userSReducer,
    group: groupReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;