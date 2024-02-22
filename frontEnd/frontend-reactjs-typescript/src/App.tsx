import React, { useEffect, useState } from 'react';
import './App.css';
import { AppRoute } from './routes/appRoute';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { fetchProfileByToken } from './auth/authSlice';
import DefaultLayout from './layouts/defaultLayout';
import ModalNotification from './component/modals/notification';

function App() {
  const [status, setStatus] = useState(false)
  const loading = useSelector((state: RootState) => state.auth.loading)
  const profile = useSelector((state: RootState) => state.auth.profile)
  const dispatch = useDispatch()
  
  const loadingAuth = (token: string) => {
    const acction: AsyncThunkAction<any, string, AsyncThunkConfig> | any = fetchProfileByToken(token);
    dispatch(acction)
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');   
    console.log(token);
    
    if(!token) return
    loadingAuth(token);
    setStatus(true)
  },[]);

  return (
   <div className="App">
      <ModalNotification/> 
      {loading && <AppRoute loading={loading} status='alo' profile={profile}/>}
    </div>
  );
}

export default App;
