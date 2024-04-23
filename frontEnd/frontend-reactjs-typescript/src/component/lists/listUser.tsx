import React, {useState, useRef, useEffect} from 'react'
import {
  PlusOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  DeleteOutlined,
  LogoutOutlined,
  SettingOutlined ,
  UserOutlined,
  CaretDownOutlined ,
  MenuOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { TypeMember } from '../../types/typesSlice'
import { useDispatch } from 'react-redux'
import { actionAcceptMember } from '../../services/actions/getDataRoom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../styles/postJob.css'

type Props = {
    idRoom: string,
}
export default function ListUser({ idRoom}: Props) {
    const nowListMember = useSelector((state: RootState) => state.rooms.data.room?.members)
    const dispatch = useDispatch();
    const [status, setStatus] = useState('')
    console.log(nowListMember,'now');
    
    useEffect(()=> {
        if(!nowListMember) return
        const waiting = nowListMember.find(member => member.status === 'waiting')
        if(waiting) {
            setStatus('waiting')
            return
        };
        setStatus('admin')
    },[])
    const handeleAcceptMember = (member: TypeMember)=> {
        const action = actionAcceptMember({
          idRoom: idRoom,
          member:member
        });
        dispatch(action)
    }

  return (
    <div className='rol  top-[50px] absolute w-[350px] -right-[50px] max-h-[400px] rounded-[5px] shadow-md shadow-gray-500 bg-white text-black '>
        <div className='flex border-b-2 border-gray-300 h-[30px]'>
            <button
                onClick={()=> setStatus('admin')}
                className={`w-1/4 rounded-tl-[5px] ${status === 'admin' ? 'bg-green-500 text-white' : ''} text-center border-r border-gray-300`}
            >
                Admin
            </button>
            <button 
                onClick={()=> setStatus('lead')}
                className={`w-1/4  ${status === 'leader' ? 'bg-green-500 text-white' : ''} text-center border-r border-gray-300`}
            >
                Leader
            </button>
            <button 
                onClick={()=> setStatus('member')}
                className={`w-1/4  ${status === 'member' ? 'bg-green-500 text-white' : ''} text-center border-r border-gray-300`}
            >
                Member
            </button>
            <button 
                onClick={()=> setStatus('waiting')}
                className={`w-1/4 rounded-tr-[5px] ${status === 'waiting' ? 'bg-green-500 text-white' : ''} text-center `}
            >
                waiting
            </button>
        </div>
        <div className='rol overflow-auto  max-h-[370px]'>
            {nowListMember && nowListMember.map((member, index) => {

                if(status === 'admin') return (
                    <>
                        {member.role === 'Admin' ?  (
                            <div className='p-2 border-b-2 flex border-gray-300 mt-2'>
                                <div className='h-[50px] mr-2 flex items-center justify-center w-[50px] rounded-full bg-gray-300'>
                                    <UserOutlined/>
                                </div>
                                <div>
                                    <p>{member.name}</p>
                                    <p>{member.email}</p>
                                </div>
                            </div>
                        ) : <></>}
                    </>
                );

                if(status === 'Lead') return (
                    <>
                        {member.role === 'Leader' ?  (
                            <div className='p-2 border-b-2 flex border-gray-300 mt-2'>
                                <div className='h-[50px] mr-2 flex items-center justify-center w-[50px] rounded-full bg-gray-300'>
                                    <UserOutlined/>
                                </div>
                                <div>
                                    <p>{member.name}</p>
                                    <p>{member.email}</p>
                                </div>
                            </div>
                        ) : <></>}
                    </>
                );

                if(status === 'member') return (
                    <>
                        {member.role === 'Member' ?  (
                            <div className='p-2 border-b-2 flex border-gray-300 mt-2'>
                                <div className='h-[50px] mr-2 flex items-center justify-center w-[50px] rounded-full bg-gray-300'>
                                    <UserOutlined/>
                                </div>
                                <div>
                                    <p>{member.name}</p>
                                    <p>{member.email}</p>
                                </div>
                            </div>
                        ) : <></>}
                    </>
                );

                if(status === 'waiting') return (
                    <>
                        {member.status === 'waiting' ?  (
                            <div className='p-2 border-b-2 flex border-gray-300 mt-2'>
                                <div className='h-[50px] mr-2 flex items-center justify-center w-[50px] rounded-full bg-gray-300'>
                                    <UserOutlined/>
                                </div>
                                <div>
                                    <p>{member.name}</p>
                                    <p>{member.email}</p>
                                    <div className='flex space-x-2 mt-1'>
                                        <button
                                            onClick={()=> handeleAcceptMember(member)}
                                            className='p-1 border font-semibold text-white bg-red-500 rounded-[5px] border-geay-300'>Accept</button>
                                        <button className='p-1 border rounded-[5px] font-semibold text-white bg-gray-500  border-geay-300'>Cancel</button>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        ) : <></>}
                    </>
                );

                return <></>
                
            })}
        </div>
    </div>
  )
}
