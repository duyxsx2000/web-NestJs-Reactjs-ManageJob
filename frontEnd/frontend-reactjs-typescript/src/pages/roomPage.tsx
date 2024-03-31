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
const lists = [1,2,4,343,43,43]
export default function RoomPage() {

  const [list, setList] = useState<'room' | 'task'>('room')
  const room = useSelector((state: RootState) => state.rooms.data)
  const [dataRoom, setDataRoom] = useState<TypeRoom | undefined>()
  const dispatch = useDispatch()
  const [aside, setAside] = useState<boolean>(true)
  const {id} = useParams();

  useEffect(() => {

    if(!id) {
      return 
    };

    const action = actionGetDataRoom(id);
    dispatch(action);

  },[id]);

  useEffect(() => {
    if(!room) return   
    setDataRoom(room)
    
  },[room])

  if(!id) {
    return <Navigate to={'/manage'} replace/>
  };


  
  return (
    <div className='flex h-full w-full bg-red-900 text-t-1 '>
      {aside ? (
        <div className=' transition-all  min-w-[270px] bg-white h-full border-r border-gray-200  '>
          <div className=' relative h-[80px] flex p-2 items-center  border-b border-gray-200'>
            <div className='w-[60px] rounded-full bg-gray-400 h-[60px]'></div>
            <div className='ml-2'>
              <p className=' font-semibold'>Đỗ Kương Duy</p>
              <p className='text-red-500'>Admin</p>
            </div>
            <div 
              className=' absolute text-gray-500 right-2 p-2 font-semibold flex items-center hover:bg-gray-200'
              onClick={() => aside ? setAside(false) : setAside(true)}
            >
              <LeftOutlined />
            </div>
          </div>
          <div className=' mt-2 '>
            <div className='flex items-center px-4 py-2  hover:bg-gray-300'>
              <BorderOutlined />
              <p className='ml-3'>Room</p>
            </div>
            <div className='flex items-center px-4 py-2 hover:bg-gray-300'>
              <UserOutlined />
              <p className='ml-3'>User</p>
            </div>
            <div className='flex items-center px-4 py-2 hover:bg-gray-300'>
              <ProjectOutlined />
              <p className='ml-3'>Dashboard</p>
            </div>
            <div className='flex items-center px-4 py-2 hover:bg-gray-300'>
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
                  <div className=' flex items-center px-4 h-[40px] hover:bg-gray-300'>
                    <div className='w-[30px] h-[30px] rounded-sm bg-blue-500'></div>
                    <p className='ml-2'>Room name</p>
                  </div>
                </li>
              ))}
              {list === 'task' && lists.map((room, index) => (
                <li key={index} className='ml-0'>
                  <div className=' flex items-center px-4 h-[40px] p-2 mt-2 '>
                    <p className='ml-2 hover:bg-gray-300 cursor-pointer border w-full rounded-[5px]  p-2 border-gray-300  mt-2'>Task name</p>
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
      {room && <RomPage room={room}/>}    
  </div>
   
  )
}
