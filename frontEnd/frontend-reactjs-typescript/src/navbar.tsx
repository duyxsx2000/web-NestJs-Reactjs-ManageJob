import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { markNorify, setLoadingNone } from './auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { UserAuth } from './types';
import { StarOutlined, StarFilled, StarTwoTone, BellOutlined } from '@ant-design/icons';
import './component/component.css'
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

export default function Navbar() {
  const style = 'font-semibold hover:text-blue-500 cursor-pointer';
  const profile = useSelector((state: RootState) => state.auth.profile)
  const notify = useSelector((state: RootState) => state.auth.profile?.notify)
  const [ntf, setNtf] = useState(false)
  const [user, setUser] = useState<UserAuth | null>(null)
  const dispatch = useDispatch()
  const divRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setNtf(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUser(profile)   
  },[profile]);

  const handleClick = () => {
    localStorage.removeItem('jwtToken');
    dispatch(setLoadingNone(''))
  };

  const markNotifyAction = (id: string) => {
    const action: AsyncThunkAction<any, string, AsyncThunkConfig> | any = markNorify(id);
    dispatch(action);
    console.log('1');
    return
  };

  const handleclickMark = () => {
    if(!profile) return
      console.log('2');
      markNotifyAction(profile.idUser)
    return
  }


  console.log(notify,'notify');
  

  return (
    <div  className=' flex px-10 justify-between items-center  top-0 z-[90] h-[5%] w-full border-b  bg-white border-gray-300 text-black'>
      <div className='flex space-x-12 text-[14px] items-center '>
        <div className='font-semibold hover:text-blue-500 cursor-pointer bg-green-500 p-2 text-white'>logo</div>
        <div className=' font-semibold hover:text-blue-500 cursor-pointer'>
          <Link to='/manage/rooms'>HOME</Link>
        </div>
        <div className={style}>CHAT</div>
        <div className={style}>MEETING ROOMS</div>
        <div className={style}>ClENDAR</div>
        <div className={style}>DASHBOARD</div>
        <div className=' relative flex items-center font-semibold text-[20px]'>
          <div className={` ${!notify ? '' : notify.find(notf => notf.status === 'await') && 'blinking-dot'}  -top-1 -left-1 absolute`}></div>
          <BellOutlined onClick={()=> ntf ? setNtf(false) : setNtf(true)} />
          {
            ntf && (
              <div ref={divRef} className=' absolute w-[300px] max-h-[400px] bg-white shadow-lg border border-gray-300 top-8 -left-0 -translate-x-1/2'>
                <div className='border-b border-gray-300 p-2 px-5 flex justify-between items-center'>
                  <p className=' font-semibold text-[15px]'>Notify</p>
                  <p onClick={()=> handleclickMark()} className='text-[12px] text-green-500'>Mark as read</p>
                </div>
                <div>
                  {notify && notify.map(item => {
    
                    if(item.link) return (
                      <Link to={item.link}>
                        <div className='text-[12px] p-2 font-normal border-b border-gray-300 bg-white cursor-pointer hover:bg-gray-100'>
                          {item.title}
                        </div>
                      </Link>
                    );
    
                    return (
                      <div className='text-[12px] p-2 font-normal border-b border-gray-300 bg-white cursor-pointer hover:bg-gray-100'>
                        {item.title}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        </div>
      </div> 
      <div onClick={handleClick} className={style}><Link to='/signIn'>Logout</Link></div>
    </div>
  )
}
