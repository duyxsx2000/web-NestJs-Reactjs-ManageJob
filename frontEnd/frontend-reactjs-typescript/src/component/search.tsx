import React from 'react'
import {
    CloseOutlined,
    UserAddOutlined,
    SearchOutlined,
    CheckOutlined
  
  } from '@ant-design/icons';
export default function Search() {
  return (
    <div className='fixed z-[100]  top-11 h-[40px] flex w-full justify-center'>
        <div className='border border-geay-300 rounded-[5px] bg-white  flex p-1'>
        <div className='flex space-x-2 mr-4 items-center '>
            <p className='w-[70px] border-2 border-gray-300 rounded-[5px] p-1 text-center'>User</p>
            <p className='w-[70px] border-2 border-gray-300 rounded-[5px] p-1 text-center'>Room</p>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center border-2 border-gray-300 rounded-[5px] w-[300px] justify-between'>
            <input className='p-1 outline-none grow'/>
            <span className='flex items-center w-[20px] justify-end'>
                <SearchOutlined/>
            </span>
            </div>
        </div>
        </div>
    </div>
  )
}
