import React, { useState, useEffect } from 'react'
import JobCard from '../component/card/jobCard'
import {
  UserOutlined, 
  LeftOutlined,
  RightOutlined,
  BorderOutlined,
  ProjectOutlined,
  SettingOutlined,

} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { UnknownAction } from '@reduxjs/toolkit';
import { AcctionType, JobType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RomPage from '../component/rooms/romPage';
import { Navigate, useParams } from 'react-router-dom';
import { actionGetDataRoom } from '../services/actions/getDataRoom';
import { TypeRoom } from '../types/typesSlice';
import { backgroundColorBg, backgroundColorBg1 } from '../styles/color';
import { setReload } from '../auth/authSlice';
import { log } from 'console';
const lists = [1,2,4,343,43,43]
export default function RoomPage() {
 
  const [list, setList] = useState<'room' | 'task'>('room')
  const profile = useSelector((state: RootState) => state.auth.profile)
  const room = useSelector((state: RootState) => state.rooms.data.room)
  const notify = useSelector((state: RootState) => state.dashboard.notify);
  const reLoad = useSelector((state: RootState) => state.auth.reload)
  const dispatch = useDispatch()
  const [aside, setAside] = useState<boolean>(true)
  const {id} = useParams();

  console.log(room,'roommm');
  
  useEffect(() => {
    
    if(!id) {
      return 
    };
    const action = actionGetDataRoom(id);
    dispatch(action);

  },[id]);

  useEffect(() => {
    if(!reLoad) return;
    dispatch(setReload(false));

  },[reLoad])


  if(!id ) {
    return <Navigate to={'/manage'} replace/>
  };

  if(reLoad ) {
    return <Navigate to={'/manage'} replace/>
  };

  console.log(room);
  
  if(!profile) return <></>
  return (
    <div className='flex h-full w-full  text-t-1 '>
      {room && aside ? (
        <div className={` transition-all  min-w-[270px] ${backgroundColorBg1[room.background]} ${!room.background ? 'text-black' : 'text-white'}  h-full border-r border-gray-200 `}>
          <div className=' relative h-[80px] flex p-2 items-center  border-b border-gray-200'>
            <div className='w-[60px] rounded-full bg-gray-400 h-[60px]'></div>
            <div className='ml-2'>
              <p className=' font-semibold'>{profile.name}</p>
              <p className='text-red-500 font-semibold'>{profile.role}</p>
            </div>
            <div 
              className=' absolute text-gray-500 right-2 p-2 font-semibold flex items-center hover:bg-[rgba(185,185,185,0.3)]'
              onClick={() => aside ? setAside(false) : setAside(true)}
            >
              <LeftOutlined />
            </div>
          </div>
          <div className=' mt-2 '>
            <div className='flex items-center px-4 py-2  hover:bg-[rgba(185,185,185,0.3)]'>
              <BorderOutlined />
              <p className='ml-3'>Room</p>
            </div>
            <div className='flex items-center px-4 py-2 hover:bg-[rgba(185,185,185,0.3)]'>
              <UserOutlined />
              <p className='ml-3'>User</p>
            </div>
            <div className='flex items-center px-4 py-2 hover:bg-[rgba(185,185,185,0.3)]'>
              <ProjectOutlined />
              <p className='ml-3'>Dashboard</p>
            </div>
            <div className='flex items-center px-4 py-2 hover:bg-[rgba(185,185,185,0.3)]'>
              <SettingOutlined />
              <p className='ml-3'>Setting</p>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex justify-between p-2'>
              <p 
                onClick={() => setList('room')}
                className={`font-semibold p-2 ${list === 'room' ? 'bg-green-500 text-white' : ''} w-1/2 text-center  rounded-[5px] border border-gay-200 cursor-pointer`}
              >
                My room
              </p>
              <p 
                className={`font-semibold p-2 ${list === 'task' ? 'bg-green-500 text-white' : ''} w-1/2 text-center  rounded-[5px] border border-gay-200 cursor-pointer`}
                onClick={() => setList('task')}
              >
                My task
              </p>
            </div>
            <ul className='list-none overflow-auto'>
              {list === 'room' && lists.map((room, index) => (
                <li key={index} className='ml-0'>
                  <div className=' flex items-center px-4 h-[40px] hover:bg-[rgba(185,185,185,0.3)]'>
                    <div className='w-[30px] h-[30px] rounded-sm bg-blue-500'></div>
                    <p className='ml-2'>Room name</p>
                  </div>
                </li>
              ))}
              {list === 'task' && lists.map((room, index) => (
                <li key={index} className='ml-0'>
                  <div className=' flex items-center px-4 h-[40px] p-2 mt-2 '>
                    <p className='ml-2 hover:bg-[rgba(185,185,185,0.3)] cursor-pointer border w-full rounded-[5px]  p-2 border-gray-300  mt-2'>Task name</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      </div>
      ) : (
        <div className='flex transition-all items-center w-[25px] bg-gray-500 h-full border-r border-gray-200  '>
          <div 
            className='flex items-center text-gray-300 p-1 hover:bg-gray-200 hover:text-gray-500'
            onClick={() => aside ? setAside(false) : setAside(true)}
          >
            <RightOutlined/>
          </div>
        </div>
      )}

      {room ? <RomPage room={room}/> : (
        <div className='flex flex-col w-full'>
          <div className={`h-[8%] z-[50] border-b border-gray-300 flex w-full items-center p-2 'text-black  `}>
            <div className='flex h-full'>
              <p className='font-bold  ml-4 text-[20px]'>
                Room Page
              </p>
              <p className=' ml-2 text-[10px] h-full flex items-start'>
                #1235656 
              </p>
              <div className='h-full w-[33px] bg-red-500 rounded-[5px] ml-4 cursor-pointer'>   
              </div>
            </div>
          </div>
          <div className='grow bg-[rgba(214,212,212,0.5)] w-full flex justify-center items-center'>
              <p>Please </p>
          </div>
        </div>
      )}    
    </div>
  )
}
