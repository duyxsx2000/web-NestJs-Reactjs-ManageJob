import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './auth/login';
import HomePage from './home/homePage';
import { AppRoute } from './routes/appRoute';
import Navbar from './navbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { fetchProfileByToken } from './auth/authSlice';
import PostJob from './admin/jobs/postJob';
import Testpage from './admin/jobs/dashboard/test';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DefaultLayout from './layouts/defaultLayout';
import ModalNotification from './component/modals/notification';
import { setModalNotification } from './redux/slices/statusDisplaySloce';
function App() {
  const [status, setStatus] = useState(false)
  const loading = useSelector((state: RootState) => state.auth.loading)
  const dispatch = useDispatch()
  
  const loadingAuth = (token: string) => {
    const acction: AsyncThunkAction<any, string, AsyncThunkConfig> | any = fetchProfileByToken(token);
    dispatch(acction)
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');   
    if(!token) return
    loadingAuth(token);
    setStatus(true)
  },[]);

  return (
    <div className="App">
      <ModalNotification/> 
      {loading && <AppRoute loading={loading} status='alo' userAuth={null}/>} 
    </div>
  );
}


export default App;
