import React, { ReactNode, useState, useEffect } from 'react'

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModalCreateUser, setModalPostJob } from '../redux/slices/statusDisplaySloce';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ModalCreateUser from '../component/modals/modalCreateUser';
import ModalDefault from '../component/modals/defaultModal';
import PostJob from '../component/form/postJobs';
type Props = {
  children: ReactNode,
  statusStart: 'JOBS' | 'USERS' | 'DASHBOARD'
}
export default function AdminLayout({children, statusStart}: Props) {
  const display = useSelector((state: RootState) => state.display.modalCreateUser);
  const display1 = useSelector((state: RootState) => state.display.modalPostJob);
  const [navbar, setNavbar] = useState(statusStart)
  const dispatch = useDispatch()

  const handleOnclickChangeNavbar = (key: 'JOBS' | 'USERS' | 'DASHBOARD') => {
    setNavbar(key)
  };
  
  return (
    <div className='flex h-[100vh] w-full '>
      <div className='navbar w-1/2 h-[10%] fixed left-2  z-10 flex items-start justify-center  '>
        <div className='w-[40px]  h-[70%] bg-white shadow-2xl border border-blue-200 mt-11 rounded-[5px] flex flex-col items-center justify-between '>
          <Link 
            to={'/admin/jobs'}
            className={`h-1/3 flex items-center justify-center w-full rounded-t-[5px] ${navbar === 'JOBS' ? 'bg-blue-400  text-white' : ''}`}
            onClick={() =>handleOnclickChangeNavbar('JOBS')}
          >
            <div className=' origin-center -rotate-90  mb-6 font-semibold '> JOBS</div>
          </Link>

          <Link 
            to={'/admin/users'}
            className={`h-1/3 flex items-center justify-center w-full  ${navbar === 'USERS' ? 'bg-blue-400  text-white' : ''}`}
            onClick={() =>handleOnclickChangeNavbar('USERS')}
          >
            <div className=' origin-center -rotate-90  mb-6 font-semibold '>USERS</div>
          </Link>

          <Link 
            to={'/admin/dashboard'}
            className={`h-1/3 flex items-center justify-center w-full rounded-b-[5px] ${navbar === 'DASHBOARD' ? 'bg-blue-400  text-white' : ''}`}
            onClick={() =>handleOnclickChangeNavbar('DASHBOARD')}
          >
            <div className=' origin-center -rotate-90  mb-6 font-semibold '>DASHBOARD</div>
          </Link>
        </div>
      </div>

      <div className='  ml-[80px] mt-[30px]   w-full'>
        {children}
      </div>

      {/* <div className=' fixed top-0 w-[250px] right-0  h-[93vh] z-[10]  px-3'>
        <div className='mt-[90px] w-[200px]'>
          <div 
            onClick={() => dispatch(setModalCreateUser(true))} 
            className='group w-full cursor-pointer rounded-md h-[50px] text-white mt-4 flex justify-center items-center bg-blue-500 font-bold text-center '
          >
            <p className='group-hover:scale-[1.1]'>Create New User</p>
          </div>
          <div 
            onClick={()=>{dispatch(setModalPostJob(true))}} 
            className='group w-full cursor-pointer  rounded-md h-[50px] text-white mt-4  bg-blue-500 font-bold flex justify-center items-center '
          >
            <p className='group-hover:scale-[1.1]'>Post Job</p>
          </div>
        </div>
      </div>

      {display1 && (
        <ModalDefault
          width='w-[700px]'
          height='h-[300px]'
          content={(
            <PostJob/>
          )}
        />
      )}
      {display && <ModalCreateUser />} */}
             
    </div>
  )
}
