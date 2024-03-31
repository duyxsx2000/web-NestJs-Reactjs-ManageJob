import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  SearchOutlined,
  CheckOutlined

} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RoomCard from '../component/card/roomsCard';
import { actionGetStartGroup } from '../services/actions/getDatas';
import { getStringDate } from '../utils/date';
import ModalDefault from '../component/modals/defaultModal';
import { CreateRoom } from '../types/typesSlice';
import ListAddUser from '../component/lists/listAddUser';
import FormCreateNewRoom from '../component/form/formCreateNewRoom';
import Search from '../component/search';


export default function HomePage() {
  const list = [1,2,3,4,5,6,7,8,9,0]
  const idGroup = useSelector((state: RootState) => state.group.data?.group.idGroup)
  const titleRooms = useSelector((state: RootState) => state.group.data?.rooms)
  const users = useSelector((state: RootState) => state.group.data?.members)
  const [action, setAction] = useState<String>('rooms')
  const [modal,setModal] = useState('none')
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(actionGetStartGroup);

    
  },[]);
  useEffect(()=> {
    console.log(titleRooms,users,'----');
    console.log(idGroup);
  },[titleRooms,users])

  const listRoom = () => {
    return (
      <div className='flex flex-wrap mt-6 overflow-auto w-full '>
        <div className='w-1/4 h-[110px]'>
          <div className='h-5/6 w-5/6'>
            <button
              onClick={(e) => {setModal('create')}}
              className="w-full h-full cursor-pointer rounded-[2px] bg-gray-300 flex font-semibold justify-center items-center hover:bg-gray-400"
            >
              Create new room
            </button>
          </div>
        </div>
        {titleRooms && titleRooms.map((room, index) => (
          <div key={index} className='w-1/4 h-[110px]'>
            <div className='h-5/6 w-5/6'>
              <RoomCard titleRoom={room}/>
            </div>
          </div>
        ))}
      </div>
    )
  };

  const listUsers = () => {
    return (
      <div className=' mt-6 w-full h-full '>
        <div className='w-full flex bg-red-200'>
            <div className='w-[5%] p-3 text-left '>STT</div>
            <div className='w-[30%] p-3 text-left'>Name</div> 
            <div className='w-[30%] p-3 text-left'>Email</div>
            <div className='w-[15%] p-3 text-left'>Role</div>
            <div className='w-[15%] p-3 text-left'>Date</div>
            <div className='w-[5%] p-3 text-left -translate-x-4'>...</div>
        </div>
        <div className=' overflow-auto h-[500px]'>
          {users && users.map((user, index) => {
            return (
              <div className={`w-full flex  ${index % 2 ? 'bg-green-200' : ''} hover:bg-gray-300 cursor-pointer`} key={index}>
                <div className='w-[5%] p-3'>{index + 1}</div>
                <div className='w-[30%] p-3'>{user.name}</div>
                <div className='w-[30%] p-3'>{user.email}</div>
                <div className='w-[15%] p-3'>{user.role}</div>
                <div className='w-[15%] p-3'>{getStringDate(user.postDate)}</div>
                <div className='w-[5%] p-3'>...</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  };


  
  return (
    <div className='h-[100vh]'>
      <Search/>
      <div className='flex h-[100vh] w-full text-t-1 justify-center  space-x-12'>
        {modal === 'create' && idGroup && (
          <ModalDefault
            width='w-[320px]'
            height='h-[500px]'
          >  
            <div 
              onClick={() => {setModal('none')}}
              className=' absolute right-1 -top-1 z-[100]'
            >
              <CloseOutlined  />
            </div>
            <FormCreateNewRoom 
              onClick={() => {setModal('none')}} 
              listUser={[]} 
              idGroup={idGroup}
            />
          </ModalDefault>
        )}
        <div className='w-[1000px] mt-8 max-h-[80%]'>
            {
              action === 'rooms' ? listRoom() :
              action === 'users' && listUsers()
            }
        </div>
        <div className='min-w-[200px] max-h-[80%] mt-12 '>
          <ul className='list-none'>
            <li className='ml-0 mt-2'>
              <div 
                onClick={() => setAction('rooms')}
                className={`font-medium p-2  rounded-[5px] ${action === 'rooms' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'} `}
              >
                Rooms
              </div>
            </li>
            <li className='ml-0 mt-2'>
              <div 
                onClick={() => setAction('users')}
                className={`font-medium p-2  rounded-[5px] ${action === 'users' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'} `}
              >
                User
              </div>
            </li>
            <li className='ml-0 mt-2'>
              <div 
                onClick={() => setAction('dashboard')}
                className={`font-medium p-2  rounded-[5px] ${action === 'dashboard' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'} `}
              >
                Dashborad
              </div>
            </li>
            <li className='ml-0 mt-2'>
              <div 
                onClick={() => setAction('late1')}
                className={`font-medium p-2  rounded-[5px] ${action === 'late1' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'} `}
              >
                Update late1
              </div>
            </li>
            <li className='ml-0 mt-2'>
              <div 
                onClick={() => setAction('late2')}
                className={`font-medium p-2  rounded-[5px] ${action === 'late2' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'} `}
              >
                Update late2
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
   
  )
}
