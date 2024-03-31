import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { setLoadingNone } from './auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { UserAuth } from './types';

export default function Navbar() {
  const style = 'font-semibold hover:text-blue-500 cursor-pointer';
  const profile = useSelector((state: RootState) => state.auth.profile)
  const [user, setUser] = useState<UserAuth | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setUser(profile)   
  },[profile]);

  const handleClick = () => {
    localStorage.removeItem('jwtToken');
    dispatch(setLoadingNone(''))
  };

  return (
    <div  className=' flex px-10 justify-between items-center  top-0 z-[90] h-[5%] w-full border-b  bg-white border-gray-300 text-black'>
      <div className='flex space-x-12 text-[14px] items-center '>
        <div className='font-semibold hover:text-blue-500 cursor-pointer bg-green-500 p-2 text-white'>logo</div>
        <div className=' font-semibold hover:text-blue-500 cursor-pointer'>
          <Link to='/home'>HOME</Link>
        </div>
        <div className={style}>CHAT</div>
        <div className={style}>MEETING ROOMS</div>
        <div className={style}>ClENDAR</div>
        <div className={style}>DASHBOARD</div>
      </div> 
      <div onClick={handleClick} className={style}><Link to='/login'>Logout</Link></div>
    </div>
  )
}
