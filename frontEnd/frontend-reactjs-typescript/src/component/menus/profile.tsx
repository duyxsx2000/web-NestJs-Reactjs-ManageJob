
import React, { useState, useEffect } from 'react'
import {
  UserOutlined, 
  LeftOutlined,
  RightOutlined,
  BorderOutlined,
  ProjectOutlined,
  SettingOutlined,

} from '@ant-design/icons';
import { backgroundColorBg1 } from '../../styles/color';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function Profile() {
    const room = useSelector((state: RootState) => state.rooms.data.room)
  return (
    // <div className={` transition-all  min-w-[270px] ${room && backgroundColorBg1[room.background]} ${room && backgroundColorBg1[room.background] === 'none' ? 'text-black' : 'text-white'}  h-full border-r border-gray-200 `}>
    //     <div className=' relative h-[80px] flex p-2 items-center  border-b border-gray-200'>
    //     <div className='w-[60px] rounded-full bg-gray-400 h-[60px]'></div>
    //     <div className='ml-2'>
    //         <p className=' font-semibold'>Đỗ Kương Duy</p>
    //         <p className='text-red-500 font-semibold'>Admin</p>
    //     </div>
    //     <div 
    //         className=' absolute text-gray-500 right-2 p-2 font-semibold flex items-center hover:bg-[rgba(185,185,185,0.3)]'
    //         onClick={() => aside ? setAside(false) : setAside(true)}
    //     >
    //         <LeftOutlined />
    //     </div>
    //     </div>
    //     <div className=' mt-2 '>
    //     <div className='flex items-center px-4 py-2  hover:bg-[rgba(185,185,185,0.3)]'>
    //         <BorderOutlined />
    //         <p className='ml-3'>Room</p>
    //     </div>
    //     <div className='flex items-center px-4 py-2 hover:bg-[rgba(185,185,185,0.3)]'>
    //         <UserOutlined />
    //         <p className='ml-3'>User</p>
    //     </div>
    //     <div className='flex items-center px-4 py-2 hover:bg-[rgba(185,185,185,0.3)]'>
    //         <ProjectOutlined />
    //         <p className='ml-3'>Dashboard</p>
    //     </div>
    //     <div className='flex items-center px-4 py-2 hover:bg-[rgba(185,185,185,0.3)]'>
    //         <SettingOutlined />
    //         <p className='ml-3'>Setting</p>
    //     </div>
    //     </div>
    //     <div className='mt-2'>
    //     <div className='flex justify-between p-2'>
    //         <p 
    //         onClick={() => setList('room')}
    //         className={`font-semibold p-2 ${list === 'room' ? 'bg-green-500 text-white' : ''} w-1/2 text-center  rounded-[5px] border border-gay-200 cursor-pointer`}
    //         >
    //         My room
    //         </p>
    //         <p 
    //         className={`font-semibold p-2 ${list === 'task' ? 'bg-green-500 text-white' : ''} w-1/2 text-center  rounded-[5px] border border-gay-200 cursor-pointer`}
    //         onClick={() => setList('task')}
    //         >
    //         My task
    //         </p>
    //     </div>
    //     <ul className='list-none overflow-auto'>
    //         {list === 'room' && lists.map((room, index) => (
    //         <li key={index} className='ml-0'>
    //             <div className=' flex items-center px-4 h-[40px] hover:bg-[rgba(185,185,185,0.3)]'>
    //             <div className='w-[30px] h-[30px] rounded-sm bg-blue-500'></div>
    //             <p className='ml-2'>Room name</p>
    //             </div>
    //         </li>
    //         ))}
    //         {list === 'task' && lists.map((room, index) => (
    //         <li key={index} className='ml-0'>
    //             <div className=' flex items-center px-4 h-[40px] p-2 mt-2 '>
    //             <p className='ml-2 hover:bg-[rgba(185,185,185,0.3)] cursor-pointer border w-full rounded-[5px]  p-2 border-gray-300  mt-2'>Task name</p>
    //             </div>
    //         </li>
    //         ))}
    //     </ul>
    //     </div>
    // </div>
    <></>
  )
}
