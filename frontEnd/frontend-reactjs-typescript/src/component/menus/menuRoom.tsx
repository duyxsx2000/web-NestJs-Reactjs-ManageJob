import React, {useState, useRef, useEffect} from 'react'
import {
  PlusOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  LeftOutlined,
  DeleteOutlined,
  LogoutOutlined,
  SettingOutlined ,
  UserOutlined,
  BellOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { actionDeleleRoom } from '../../services/actions/getDataRoom';
import { useDispatch } from 'react-redux';
import { TypeRoom } from '../../types/typesSlice';
import { getStringDate } from '../../utils/date';
type Props = {
    onClickClose: () => void,
    onClickUsers: () => void,
    idRoom:string,
    idGroup:string,
    room: TypeRoom
}
export default function MenuRoom({
    onClickClose,
    onClickUsers,
    idRoom,
    idGroup,
    room
}: Props) {

    const [del, setDel] = useState(false);
    const [status, setStatus] = useState('menu')
    const dispatch = useDispatch()
    const handleDelateRoom = () => {
        const action = actionDeleleRoom({idGroup: idGroup, idRoom:idRoom});
        dispatch(action)
    }
  return (
    <div className='w-1/4 h-full bg-white border-l-2 border-gray-300 px-2'>
        {status === 'menu' && (
            <>
                <div className='flex justify-center items-center h-[50px] relative px-4 border-b-2 border-gray-300 font-semibold text-[18px]'>
                    <p>Menu</p>
                    <span
                        onClick={onClickClose}
                        className=' absolute flex items-center  right-0'>
                        <CloseOutlined/>
                    </span>
                </div>
                <div className='rol h-[92%]  flex flex-col justify-between text-gray-700'>
                    <div>
                        <div className='mt-4 border-b-2 border-gray-300 px-4 pb-2 space-y-2 '>
                        <div className='flex items-center cursor-pointer font-semibold'>
                            <SettingOutlined style={{fontSize:'15px', marginRight:'8px'}}/>
                            <p>Setting / admin only </p>  
                        </div>
                        {!del ? (
                            <div
                            onClick={()=> setDel(true)}
                            className='p-1 cursor-pointer px-3 flex items-center hover:bg-gray-100 rounded-[5px]'
                        >   
                            
                            <DeleteOutlined style={{fontSize:'15px'}} className='mr-2' />
                            Delate Room
                        </div>
                        ) : (
                            <div
        
                                className=' cursor-pointer  flex items-center  border-2 border-gray-400'
                            >   
                                <button
                                    onClick={()=> handleDelateRoom()}
                                    className='flex items-center w-1/2 p-1 justify-center bg-red-500 hover:bg-red-700 text-white font-semibold'>
                                    <DeleteOutlined style={{fontSize:'15px'}} className='mr-2' />
                                    Delate 
                                </button>
                                <button 
                                    onClick={()=> setDel(false)}
                                    className='flex items-center p-1 w-1/2 justify-center bg-blue-500 hover:bg-blue-700 text-white font-semibold'>
                                    <CloseOutlined style={{fontSize:'15px'}} className='mr-2'  />
                                    Cancel
                                </button>
           
                            </div>
                        )}
                        <div 
                            className='p-1 cursor-pointer px-3 flex items-center hover:bg-gray-100 rounded-[5px]'
                        >
                            <div className='w-[15px] h-[15px] rounded-[2px] bg-green-500 mr-2'></div>
                            Change background
                        </div>
                        <div 
                            className='p-1 cursor-pointer px-3 flex items-center hover:bg-gray-100 rounded-[5px]'
                            onClick={()=>onClickUsers()}
                        >
                            <UserOutlined style={{fontSize:'15px', marginRight:'8px'}}/>
                            Users
                        </div>
                        </div>
                        <div className='mt-4 border-b-2  border-gray-300 px-4 pb-2 space-y-2'>
                            <div 
                                onClick={()=> setStatus('action')}
                                className='p-1 cursor-pointer px-3 flex items-center hover:bg-gray-100 rounded-[5px]'
                            >
                                <UnorderedListOutlined style={{fontSize:'15px'}} className='mr-2' />
                                Action 
                            </div>
                            <div 
                                className='p-1 cursor-pointer px-3 flex items-center hover:bg-gray-100 rounded-[5px]'
                            >
                                <BellOutlined style={{fontSize:'15px'}} className='mr-2' /> 
                                Notify
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 border-b-2  border-gray-300 px-4 pb-2 space-y-2'>
                        <div 
                        className='p-1 cursor-pointer px-3 flex items-center hover:bg-gray-100 rounded-[5px]'
                        >
                        <LogoutOutlined style={{fontSize:'15px'}} className='mr-2' />
                        Exit Room
                        </div>
                    </div>
                </div>
            </>
        )}
        {status === 'action' && (
            <div>
                <div className='flex justify-center items-center h-[50px] relative px-4 border-b-2 border-gray-300 font-semibold text-[18px]'>
                    <p>Action</p>
                    <span
                        onClick={() => setStatus('menu')}
                        className=' absolute flex items-center  right-0'>
                        <LeftOutlined />
                    </span>
                </div>
                <div className=''>
                    {room.actions.map((action, index) => (
                        <div key={index} className='flex space-x-4 items-start mt-3'>
                            {action.nameMember && (
                                <div className=' rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'>
                                    <UserOutlined/>
                                </div>
                            )}
                            <div className={`w-5/6`}>
                                <div className='flex'>
                                    {action.nameMember && <p className=' font-medium'>{action.nameMember}</p>}
                                    <p className=' text-gray-400 text-[12px] flex items-center ml-2'>{getStringDate(action.date)}</p>
                                </div>
                                <div className='p-1 grow  shadow-gray-300  shadow-sm rounded-[5px] w-full' >{action.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}
