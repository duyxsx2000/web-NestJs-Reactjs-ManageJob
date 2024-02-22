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
    <div  className=' flex px-10 justify-center items-center sticky top-0 z-[90] h-[50px] w-full border-b  bg-[#151515] border-gray-300 text-white'>
      <div className='flex space-x-12 text-xl '>
        <div className=' font-semibold hover:text-blue-500 cursor-pointer'>
          <Link to='/home'>HOME</Link>
        </div>
        <div className={style}>GROUP</div>
        <div className={style}>CHAT</div>
        <div className={style}>MEETING ROOMS</div>
        <div className={style}>ClENDAR</div>
        {user?.role === 'admin' ? (
          <div className={`font-semibold group  cursor-pointer group relative`}>
            <Link className='hover:text-blue-500' to='/admin'>ADMIN</Link>
            <div className='absolute hidden group-hover:block font-semibold rounded-b-lg w-[200%] -translate-x-1/4 bg-[#151515] shadow-md  top-full z-[100]'>
              <div className='border-b hover:text-blue-500 border-gray-600 mt-4 text-center'><Link to='/admin/users'>Users</Link></div> 
              <div className='border-b hover:text-blue-500 border-gray-600 mt-4 text-center'><Link to='/admin/jobs'>Jobs</Link></div> 
              <div className='border-b hover:text-blue-500 border-gray-600 mt-4 text-center rounded-b-lg mb-2'><Link to='/admin/dashboard'>Dashboard</Link></div>  
            </div>
          </div>
        ) : user?.role === 'leader' ? (
          <div onClick={()=>{}} className={style}><Link to='/leader'>LEADER</Link></div>
        ) : ''
        }
        <div className={style}>DASHBOARD</div>
        <div onClick={handleClick} className={style}><Link to='/login'>Logout</Link></div>
      </div> 
    </div>
  )
}
