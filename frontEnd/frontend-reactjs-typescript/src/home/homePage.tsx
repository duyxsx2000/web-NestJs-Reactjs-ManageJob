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

import { fetchJobs } from '../redux/slices/jobsSlice';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { UnknownAction } from '@reduxjs/toolkit';
import { AcctionType, JobType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import RomPage from '../component/rooms/romPage';
const list = [1,2,4,343,43,43,34,343,3,43,34,3,4,3,3,3,3,3,33,3,3,3,3]
export default function HomePage() {
  const jobs = useSelector((state: RootState) => state.job.jobs.home)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [width, setWidth] = useState<number>()
  const [statusNav, setStatusNav] = useState<string>('All Jobs')
  const [display, setDisplay] = useState<string>('listJobs')
  const [detailJob, setDetailJob] = useState<JobType | null>(null)
  const dispatch = useDispatch()
///////////
  const [aside, setAside] = useState<boolean>(true)
 
  const [items1, setItems1] = useState<JobType[] | []  >([]);
  const [items2, setItems2] = useState<JobType[] |[]>([]);

  useEffect(() => {
    if(!jobs) {
      console.log('no jobs');
      return 
    }
    setItems1(jobs.slice(0, 5))

  },[jobs]);

  const divWidth = windowWidth - 270;
  const widthD = `${divWidth}px`.toString()
  console.log(widthD);
  useEffect(() => {

    const handleResize = () => {

      const windowWidth = window.innerWidth;

      if (!hasRunOnce) {
        setHasRunOnce(true);
        setWidth(windowWidth)
      } else {
        setWidth(windowWidth)
      };
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasRunOnce]);

  useEffect(() => {
    console.log(1234);
    
    const action: UnknownAction | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType = fetchJobs('home');
    dispatch(action)
  },[])


  return (

    <div className=' flex h-full w-full text-t-1 '>
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
            <p className='font-semibold p-4'>My room</p>
            <ul className='list-none'>
              <li className='ml-0'>
                <div className=' flex items-center px-4 h-[40px] hover:bg-gray-300'>
                  <div className='w-[30px] h-[30px] rounded-sm bg-blue-500'></div>
                  <p className='ml-2'>Room name</p>
                </div>
              </li>
              <li className='ml-0'>
                <div className=' flex items-center px-4 h-[40px] hover:bg-gray-300'>
                  <div className='w-[30px] h-[30px] rounded-sm bg-yellow-500'></div>
                  <p className='ml-2'>Room name</p>
                </div>
              </li>
              <li className='ml-0'>
                <div className=' flex items-center px-4 h-[40px] hover:bg-gray-300'>
                  <div className='w-[30px] h-[30px] rounded-sm bg-green-500'></div>
                  <p className='ml-2'>Room name</p>
                </div>
              </li>
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
      <RomPage/>  
  </div>
   
  )
}
