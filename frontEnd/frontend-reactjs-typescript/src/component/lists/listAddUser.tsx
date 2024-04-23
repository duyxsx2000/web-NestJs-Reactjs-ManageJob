import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  SearchOutlined,
  CheckOutlined,
  CaretDownOutlined

} from '@ant-design/icons';
import Stick from '../actions/stick';

type Props = {
    list: any[]
    onClick: (id: string, role: string, name: string, email: string) => void
}
export default function ListAddUser({list, onClick}: Props) {

  return (
    <div className=' absolute w-[300px] h-[350px] bg-white -left-[105%] -top-12 rounded-[5px]'>
        <div className='p-2'>
            <div className='border-2 border-gray-300 rounded-[5px] flex items-center'>
                <input className=' outline-none grow'></input>
                <SearchOutlined />
            </div>
        </div>
        <div className='overflow-auto h-[85%]'>
            <ul className='list-none  p-2 '>
                {list.map((item, index) => (
                <li key={index} className='p-1 m-0 border-b  border-gray-300'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p>Nguyen Van Nam</p>
                            <p className='text-[10px]'>nam123@gmail.com</p>
                        </div>
                        <Stick onClick={onClick} id={item.id} name={item.name} email={item.email}/>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
