import React, { useEffect } from 'react';
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
import BlogEditor from './admin/jobs/dashboard/test1';
function App() {

  const loading = useSelector((state: RootState) => state.auth.loading)
  const dispatch = useDispatch()

  const loadingAuth = (token: string) => {
    const acction: AsyncThunkAction<any, string, AsyncThunkConfig> | any = fetchProfileByToken(token);
    dispatch(acction)
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    
    if(!token) return
    loadingAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksInVzZXJOYW1lIjoixJDhu5cgS2jGsMahbmcgRHV5Iiwicm9sZXMiOiJhZG1pbiIsImVtYWlsIjoiZHV5MTIzQGdtYWlsLmNvbSIsImlhdCI6MTcwMjU0MzQ4MywiZXhwIjoxNzAzMTQzNDgzfQ.qbE4zbz4HUgFLIf2t9im6zl5mE5txF2CG6be0pDQfR')
   
  },[]);

  return (
    <div className="App">
      {loading === 'none' && <Navbar/>}
      
      <div className=' min-h-[100vh]'>
        <PostJob/>  
       
    
       {/* <AppRoute loading={loading} status='alo' userAuth={null}/> */}
      </div>
      <div style={{height: '50px', background: 'pink'}} className='z-40'>nav</div>

    </div>
  );
}


export default App;
