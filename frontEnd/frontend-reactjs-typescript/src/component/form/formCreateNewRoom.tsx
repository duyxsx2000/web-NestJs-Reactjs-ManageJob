import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  SearchOutlined,
  CheckOutlined

} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import RoomCard from '../card/roomsCard';
import { actionGetStartGroup } from '../../services/actions/getDatas';

import ListAddUser from '../lists/listAddUser';
import { CreateRoom } from '../../types/typesSlice';
import { actionCreateNewRoom } from '../../services/actions/createNewData';

type Props = {
    listUser: any[],
    idGroup: string,
    onClick: () => void
}
export default function FormCreateNewRoom({listUser, idGroup, onClick}: Props) {

    const list = [
        {
        name: 'Đỗ khương Duy',
        id: 'duy123'
        },
        {
            name: 'Đỗ khương Duy',
            id: 'duy124'
        },
        {
            name: 'Đỗ khương Duy',
            id: 'duy125'
        },
        {
            name: 'Đỗ khương Duy',
            id: 'duy126'
        },
        {
            name: 'Đỗ khương Duy',
            id: 'duy127'
        }
    ]
    const profile = useSelector((state: RootState) => state.auth.profile)
    console.log(profile,'prf');
    
    const [addUser, setAddUser] = useState(false)
    const [addUPriority, setAPriority] = useState(false)
    const [priority, setPriority] = useState('priority')
    const [color, setColor] = useState('none')
    const [validate, setValidate] = useState(false)
    const [status, setStatus] = useState(true)
    const [createRoom, setCreateRoom] = useState<CreateRoom>({
        idGroup: idGroup,
        title: '',
        mainTask: '',
        background:'',
        priority: '',
        members:[{
            idMember:'',
            role: 'admin',
            name:'',
            email:'',
            status: 'join'
        }],
    })
    const dispatch = useDispatch()
    useEffect(() => {
        if(createRoom.title && createRoom.mainTask) {
            setValidate(true)
            return
        }
    }, [createRoom]);

    useEffect(() => {
        if(profile?.idUser) {
            setCreateRoom({
                ...createRoom,
                members: [
                    {
                        idMember: profile.idUser,
                        role: 'Admin',
                        name:profile.name,
                        status:'join',
                        email: profile.email
                    }
                ]
            })
        }
    },[profile]);

    const handleChangeMember = (id: string, role: string, name: string, email: string) => {

        const room = {...createRoom};
        const index = room.members.findIndex(member => member.idMember === id);

        if(index !== -1) {
            const newMembers = [...room.members]; 
            newMembers[index].role = role;

            setCreateRoom({
                ...room,
                members: [
                    ...newMembers
                ]
            }) ;
            return
        };

        setCreateRoom({
            ...room,
            members: [
                ...room.members,
                {
                    idMember: id, 
                    role: role,
                    status: 'waiting',
                    name: name,
                    email: email
                }
            ]
        });
    };

    const handleChangeInput= (e: any) => {
        setStatus(true)
        const {name, value} = e.target;
        setCreateRoom({
            ...createRoom,
            [name]: value
        });
    };
  
    const handleSetColor = (value: string) => {
      
      setColor(value);
      setCreateRoom({
        ...createRoom,
        background: value
      });
    };

    const handleSetPriority = (title: string) => {
        setPriority(title);
        setCreateRoom({
            ...createRoom,
            priority: title
        });
    };

    const handleOnClickCreate = () => {
        
        if(!validate) {
            setStatus(false);
            return
        }
        const action = actionCreateNewRoom(createRoom);
        dispatch(action)
        onClick()   
    }
  return (
    <div className=' relative p-2'>
        <p className='w-full text-center mt-2 font-medium'>Create New Room</p>

        <div className='w-full p-2'>
            <div className='w-full  '>
                <label className=' font-semibold '>Title</label>
                <input
                    name='title'
                    onChange={(e)=> handleChangeInput(e)}
                    value={createRoom.title}
                    className={`w-full block mt-1 p-1 outline-none border rounded-[5px] ${status ? 'border-green-500' : 'border-red-500'}`}
                />
            </div>
            <div className='w-full mt-2 '>
                <label className=' font-semibold '>Main task</label>
                <input
                    name='mainTask'
                    onChange={(e)=> handleChangeInput(e)}
                    value={createRoom.mainTask}
                    className={`w-full block mt-1 p-1 outline-none border rounded-[5px] ${status ? 'border-green-500' : 'border-red-500'}`}
                />
            </div>

        </div>
        <div className='p-2'>
            <p className='font-semibold'>Background</p>
            <div>
                <ul className='list-none flex space-x-3 mt-2'>
                    <li 
                        id='none' 
                        className=' ml-0 w-[30px] h-[30px] border border-gray-300 rounded-[2px] text-black flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'none' && <CheckOutlined />}
                    </li>
                    <li 
                        id='red' 
                        className='w-[30px] h-[30px] border bg-gradient-to-br from-red-500 to-red-700 rounded-[2px] text-white flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'red' && <CheckOutlined />}
                    </li>
                    <li 
                        id='green' 
                        className='w-[30px] h-[30px] border bg-gradient-to-br from-green-500 to-green-700 rounded-[2px] text-white flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'green' && <CheckOutlined />}
                    </li>                
                    <li                        
                        id='yellow' 
                        className='w-[30px] h-[30px] border bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-[2px] text-white flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'yellow' && <CheckOutlined />}
                    </li>

                    <li 
                        id='pink' 
                        className='w-[30px] h-[30px] border bg-gradient-to-br from-pink-500 to-pink-700 rounded-[2px] text-white flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'pink' && <CheckOutlined />}
                    </li>
                    <li 
                        id='orange' 
                        className='w-[30px] h-[30px] border bg-gradient-to-br from-orange-500 to-orange-700 rounded-[2px] text-white flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'orange' && <CheckOutlined />}
                    </li>
                    <li 
                        id='cyan' 
                        className='w-[30px] h-[30px] border bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-[2px] text-white flex justify-center items-center text-[25px]'
                        onClick={(e) => handleSetColor(e.currentTarget.id)}
                    >
                        {color === 'cyan' && <CheckOutlined />}
                    </li>
                </ul>
            </div>
        </div>
        <div className=' relative flex mt-2 justify-between p-2 '>
            <button
                onClick={() => setAddUser(true)}
                className='flex items-center font-medium rounded-[5px] w-[45%] border-2 border-graay-700 p-1 justify-center'
            >
                <UserAddOutlined />
                Add member
            </button>
            <button
                onClick={() => setAPriority(true)}
                className='flex items-center font-medium rounded-[5px] w-[45%] border-2 border-graay-700 p-1 justify-center'
            >
                {priority}
            </button>
            {addUser && <ListAddUser onClick={(id: string, role: string, name: string, email: string) => handleChangeMember(id, role, name, email)} list={list}/>}
            {addUPriority  && (
                <div className=' absolute w-[135px]  bg-white -right-[50%] rounded-[5px]'>
                <div 
                    onClick={()=> handleSetPriority('Hight')} 
                    className={`p-2 border-b border-gray-300 cursor-pointer ${priority === 'Hight' ? 'bg-gray-200' : ''}`}
                >
                    Hight priority
                </div>
                <div 
                    onClick={()=> handleSetPriority('Medium')}                   
                    className={`p-2 border-b border-gray-300 cursor-pointer ${priority === 'Medium' ? 'bg-gray-200' : ''}`}
                >
                    Medium priority
                </div>
                <div 
                    onClick={()=> handleSetPriority('Low')}
                    className={`p-2 border-b border-gray-300 cursor-pointer ${priority === 'Low' ? 'bg-gray-200' : ''}`}
                >
                    Low priority
                </div>
                </div>
            )}
        </div>
        <div className='p-2 mt-2'>
        <button
            type='button'
            onClick={()=> handleOnClickCreate()}
            className='p-2 w-full bg-green-500 rounded-[5px] text-white font-medium'
        >
            Create
        </button>
        </div>
    </div>
  )
}
