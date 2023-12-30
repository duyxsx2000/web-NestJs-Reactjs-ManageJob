import React from 'react'
import { 
    PhoneOutlined,
    UserOutlined,
    MailOutlined,
    MenuOutlined ,
    DeleteOutlined,
    EditOutlined,
    FileDoneOutlined

} from '@ant-design/icons';
import { CreateUser, User } from '../types';
import { AnyARecord } from 'dns';

type Props = {
    color: 'bg-green-500' | 'bg-red-500' | 'bg-yellow-500',
    user: User | null,
    onClick: () => void,
    loading: boolean
}
export default function UserCard({
    color, 
    user, 
    onClick, 
    loading
}: Props) {

    if(loading) {
        return (
            <div className='w-full h-full p-2 rounded-md relative'>
                {/* <div className='absolute bg-white shadow-lg rounded-md p-2 bottom-[45px] -right-4'>
                    <div className='flex space-x-3'>
                        <button style={{color:'red'}}><DeleteOutlined /></button>
                        <button style={{color:'blue'}}><EditOutlined /></button>
                        <button style={{color:'blue'}}><FileDoneOutlined /></button>
                    </div>
                </div> */}
                <div className='flex'>
                    <div className='w-20 h-20 rounded-full  bg-gray-300'></div>
                    <div className={`flex-1 ml-2 ${color} p-2 text-white`}>
                        <div className='flex items-center'>
                            <UserOutlined className='mr-2' />
                            <p>{user?.name}</p>
                        </div>
                        <div className='flex items-center'>
                            <MailOutlined className='mr-2'/>
                            <p>{user?.email}</p>
                        </div>
                        <div className='flex items-center'>
                            <PhoneOutlined className='mr-2'/>
                            <p>{user?.phone}</p>
                        </div>
        
                    </div>
                </div>
                <div className='flex space-x-2 justify-between'>
                    <div className='mt-2'>
                        <p className=' font-semibold'>{user?.position}</p>
                        <p className=' font-semibold'>{user?.level}</p>
                        <p className=' font-semibold'>12/12/2021</p>
                    </div>
                    <div className='flex text-blue-500 hover:text-blue-800  h-full justify-end items-end mt-12'>
                        <MenuOutlined title="Click me to see details" onClick={onClick} style={{fontSize:'30px'}} />
                    </div>
                </div>
              
            </div>
        )
    } else {
        return (
            <div className='w-full h-full p-2 rounded-md'>
                <div className='flex'>
                    <div className='w-20 h-20 rounded-full  bg-gray-300'></div>
                    <div className='flex-1 ml-2 bg-gray-300 p-2 text-white'> </div>
                </div>
                <div className='flex space-x-2 justify-between bg-gray-300 h-16 mt-2'></div>
            </div>
        )
    }  

}
