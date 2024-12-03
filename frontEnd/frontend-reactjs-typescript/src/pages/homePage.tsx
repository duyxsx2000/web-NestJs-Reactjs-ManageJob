import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  DeleteOutlined ,
  SearchOutlined,
  CheckOutlined,
  PlusOutlined,
  BellOutlined

} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RoomCard from '../component/card/roomsCard';
import { actionGetStartGroup } from '../services/actions/getDatas';
import { getStringDate } from '../utils/date';
import ModalDefault from '../component/modals/defaultModal';
import FormCreateNewRoom from '../component/form/formCreateNewRoom';
import Search from '../component/search';
import AddUserForm from '../component/form/addUser';
import { Link, Navigate, useParams } from 'react-router-dom';


export default function HomePage() {
  const list = [1,2,3,4,5,6,7,8,9,0]
  const idGroup = useSelector((state: RootState) => state.group.data?.idGroup)
  const titleRooms = useSelector((state: RootState) => state.group.data?.rooms)
  const users = useSelector((state: RootState) => state.group.data?.members)
  const profile = useSelector((state: RootState) => state.auth.profile)
  const [action, setAction] = useState<String>('rooms')
  const [modal,setModal] = useState('none')
  const [addUser, setAddUser] = useState(false)
  const dispatch = useDispatch()
  const {key} = useParams();
  const [member, setMember] = useState('')
  useEffect(() => {
    if(key) {
      setAction(key);  
    };
  },[key]);

  useEffect(() => {
    dispatch(actionGetStartGroup);
  },[]);

  const listRoom = () => {
  
    const yourRooms = titleRooms?.filter((room) => room.members.find(member => member.idMember === profile?.idUser));
    const allRoom = titleRooms?.filter((room) => !room.members.find(member => member.idMember === profile?.idUser));
    const yourWaiting = yourRooms?.filter((room) => room.members.find(member => member.status === 'waiting' && member.idMember === profile?.idUser) );
    const yourJoin = yourRooms?.filter((room) => room.members.find(member => member.status === 'join' && member.idMember === profile?.idUser ? room : undefined));
    
    return (
      <div className='mt-6'>
        {yourJoin && yourJoin.length >= 1 &&(
          <div>
            <p className=' font-semibold text-[20px]'>Your Rooms</p>
            <div className='flex flex-wrap mt-6  overflow-auto w-full '>
              {yourJoin.map((room, index) => 
                <div key={index} className='w-1/4 h-[110px]'>
                  <div className='h-5/6 w-5/6'>
                    <RoomCard titleRoom={room} type='join'/>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {yourWaiting && yourWaiting.length >= 1 &&(
          <div>
          <p className=' font-semibold text-[20px]'>Waiting accept</p>
            <div className='flex flex-wrap mt-6  overflow-auto w-full '>
              {yourWaiting.map((room, index) => 
                room.members.map(member => member.idMember === profile?.idUser && member.status === 'waiting' ? (
                  <div key={index} className='w-1/4 h-[110px]'>
                    <div className='h-5/6 w-5/6'>
                      <RoomCard titleRoom={room} type='waiting'/>
                    </div>
                  </div>
                ) : <div key={index}></div>
              ))}
            </div>
          </div>
        )}
        <p className=' font-semibold mt-2 text-[20px]'>All Rooms</p>
        <div className='flex flex-wrap mt-6  overflow-auto w-full '>
          {profile?.role === 'admin' && (
            <div className='w-1/4 h-[110px]'>
              <div className='h-5/6 w-5/6'>
                <button
                  type='button'
                  onClick={(e) => {setModal('create')}}
                  className="w-full h-full cursor-pointer rounded-[2px] bg-gray-300 flex font-semibold justify-center items-center hover:bg-gray-400"
                >
                  Create new room
                </button>
              </div>
            </div>
          )}
          {allRoom && allRoom.map((room, index) => 
            (
              <div key={index} className='w-1/4 h-[110px]'>
                <div className='h-5/6 w-5/6'>
                  <RoomCard titleRoom={room} />
                </div>
              </div>
            )
          )}
        </div>
     </div>
    )
  };

  const listUsers = () => {
    return (
      <div className=' mt-6 w-full max-h-full border-2 border-gray-200 '>
        <div className='w-full flex bg-red-200'>
            <div className='w-[5%] p-3 text-left '>STT</div>
            <div className='w-[30%] p-3 text-left'>Name</div> 
            <div className='w-[30%] p-3 text-left'>Email</div>
            <div className='w-[15%] p-3 text-left'>Role</div>
            <div className='w-[15%] p-3 text-left'>Date</div>
            <div className='w-[5%] p-3 text-left -translate-x-4'>...</div>
        </div>
        <div className=' overflow-auto max-h-[500px]'>
          {users && users.map((user, index) => {
            if(member === user.idMember) {
              return (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center '>
                    <BellOutlined  className=' hover:text-red-900' style={{fontSize:'20px', marginRight:'20px', marginLeft:'30px'}}/>
                    <DeleteOutlined  className=' hover:text-red-900' style={{fontSize:'20px'}}/>
                  </div>
                  <div onClick={()=> setMember('')} className='w-[5%] p-3'>...</div>
                </div>
              )
            }
            return (
              <div  className={`w-full flex  ${index % 2 ? 'bg-green-200' : ''} hover:bg-gray-300 cursor-pointer`} key={index}>
                <div className='w-[5%] p-3'>{index + 1}</div>
                <div className='w-[30%] p-3'>{user.name}</div>
                <div className='w-[30%] p-3'>{user.email}</div>
                <div className='w-[15%] p-3'>{user.role}</div>
                <div className='w-[15%] p-3'>{getStringDate(user.date)}</div>
                <div onClick={()=> setMember(user.idMember)} className='w-[5%] p-3'>...</div>
              </div>
            )
          })}
  
        </div>
        {!addUser ? (
          <div onClick={()=> setAddUser(true)} className={`w-full p-3 bg-gray-100 hover:bg-gray-300 hover:text-white text-center cursor-pointer flex justify-center items-center `}>
            <PlusOutlined />
            <p className='text-center font-medium ml-2'>Add User</p>
          </div>
        ) : idGroup && (
          <div className={`w-full  `}>
            <AddUserForm idGroup={idGroup} closeModal={() => {setAddUser(false)}}/>
          </div>
        )}
      </div>
    )
  };


  if(!profile) return <></>
  
  return (
    <div className=''>
      {/* <Search/> */}
      
      <div className='flex  w-full text-t-1 justify-center  space-x-12'>
      
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
