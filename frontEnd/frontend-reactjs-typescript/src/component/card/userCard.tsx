import React from 'react'
import { 
    PhoneOutlined,
    UserOutlined,
    MailOutlined,
    MenuOutlined ,
    DeleteOutlined,
    EditOutlined,
    FacebookOutlined

} from '@ant-design/icons';
import { User } from '../../types';


type Props = {
    color: string | undefined,
    user: User | null,
    onClick: {
        delete: () => void,
        menu: () => void,
        edit: () => void
    },
    loading: boolean
}
export default function UserCard({
    color, 
    user, 
    onClick, 
    loading
}: Props) {
    
    if(loading && user) {
        return (
            <div className='w-full h-full p-2 rounded-md relative'>
                <div className='flex'>
                    <div className='w-20 h-20 rounded-full  bg-gray-300'></div>
                    <div className={`flex-1 ml-2 bg-gradient-to-r from-${color}-500 to-${color}-300 p-2 text-white rounded-lg flex flex-col justify-between `}>
                        <div className='flex items-center font-semibold'>
                            <p>{user?.name}</p>
                        </div>
                        <div className='flex items-center font-semibold'>
                            <p>{user?.position && user?.position.length > 22 ? `${user?.position.slice(0, 22)}...` : user?.position}</p>
                        </div>
                        <div className='flex items-center mt-2'>
                            <div className='flex items-center'>
                                <MailOutlined className='mr-2'/>
                            </div>
                            <div className='flex items-center'>
                                <PhoneOutlined className='mr-2'/>
                            </div>
                            <div className='flex items-center'>
                                <FacebookOutlined className='mr-2'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='  justify-between mt-2'>
                    <div className='w-full flex items-center justify-between m-0 '>
                        <p className='text-red-500 font-semibold'>{`ID ${user?.id}`}</p>
                        <div className='flex  space-x-2 h-full text-blue-500 justify-end items-end mb-2 '>
                            <DeleteOutlined 
                                className='hover:scale-[1.1]' 
                                onClick={onClick.delete}
                                style={{fontSize:'17px', color: 'red'}} 
                            />
                            <EditOutlined 
                                className='hover:scale-[1.1]' 
                                onClick={onClick.edit}
                                style={{fontSize:'17px'}}
                            />
                            <MenuOutlined 
                                title="Click me to see details"
                                className='hover:scale-[1.1]'  
                                onClick={onClick.menu} 
                                style={{fontSize:'17px'}} 
                            />
                        </div>
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
