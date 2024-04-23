import React, { useEffect, useState } from 'react';
import './App.css';
import { AppRoute } from './routes/appRoute';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { fetchProfileByToken, setLoading } from './auth/authSlice';
import DefaultLayout from './layouts/defaultLayout';
import ModalNotification from './component/modals/notification';

function App() {
  const [status, setStatus] = useState(false)
  const loading = useSelector((state: RootState) => state.auth.loading)
  const profile = useSelector((state: RootState) => state.auth.profile)
  const dispatch = useDispatch()
  console.log('olaolaola');
  
  const loadingAuth = (token: string) => {
    const acction: AsyncThunkAction<any, string, AsyncThunkConfig> | any = fetchProfileByToken(token);
    dispatch(acction)
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');   

    if(!token) {
      dispatch(setLoading('none'));
      return
    };
    
    loadingAuth(token);
    setStatus(true)
  },[loading]);

  return (
   <div className="App ">
      <ModalNotification/> 
      {loading && profile && <AppRoute loading={loading} status='alo' profile={profile}/>}
    </div>
  );
}

export default App;
