import React from 'react'
import {
    PlusOutlined,
    TeamOutlined,
    DashOutlined,
    CloseOutlined,
    DeleteOutlined,
    LogoutOutlined,
    SettingOutlined ,
    UserAddOutlined,
    UserOutlined,
    CaretDownOutlined ,
    MenuOutlined,
    UnorderedListOutlined,
    DownOutlined
  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
    clickClose: () => void
}
export default function AddMember({
    clickClose
}: Props) {
    const members = useSelector((state: RootState) => state.rooms.data.room?.members)
  return (
    <div>
        <div className=' relative p-4'>
            <p className=' font-semibold text-[20px]'>Members</p>
            <span
                onClick={()=>clickClose()}
                className=' absolute text-[20px] flex items-center right-5 top-5'>
                <CloseOutlined></CloseOutlined>
            </span>
        </div>
        <div className=' flex p-4 justify-between'>
            <input
                className='w-[60%] rounded-[5px] outline-none border-2 border-gray-300 p-2'
                placeholder='Email or Name'
            ></input>
            <div className='flex'>
                <button className='flex rounded-[5px] items-center justify-between p-2 w-[100px] bg-gray-200 hover:bg-gray-400 font-semibold ml-2'>
                    Member
                    <DownOutlined />
                </button>
                <button className='flex rounded-[5px] items-center p-2 w-[80px] bg-blue-500 hover:bg-blue-600 text-white justify-center font-semibold ml-2'>
                    Add
                </button>
            </div>
        </div>
    </div>
  )
}
