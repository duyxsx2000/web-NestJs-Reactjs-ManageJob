import React, {useState, useRef, useEffect} from 'react'
import {
  PlusOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined ,
  UserOutlined,
  CaretDownOutlined ,
  MenuOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { TypeMember } from '../../types/typesSlice'
import { useDispatch } from 'react-redux'
import { actionAcceptMember, actionDeleteMemberByRoom } from '../../services/actions/getDataRoom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../styles/postJob.css'

type Props = {
    idRoom: string,
}

export default function ListUser({ idRoom}: Props) {
    const role = useSelector((state: RootState) => state.rooms.role);
    const idGroup = useSelector((state: RootState) => state.group.data?.idGroup);
    const nowListMemberByRoom = useSelector((state: RootState) => state.rooms.data.room?.members);
    const [option,setOption] = useState('')
    const [changeRole, setchangeRole] = useState(false)
    const [deleteMember, setDeleteMember] = useState<boolean | string>(false)
    const dispatch = useDispatch();
    const [status, setStatus] = useState('')

    const changeRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (changeRef.current && !changeRef.current.contains(event.target as Node)) {
                setOption('')
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);
    
    useEffect(()=> {
        if(!nowListMemberByRoom) return
        const waiting = nowListMemberByRoom.find(member => member.status === 'waiting')
        if(waiting) {
            setStatus('waiting')
            return
        }; 
        setStatus('admin')
    },[]);

    const handeleAcceptMember = (member: TypeMember)=> {
        const action = actionAcceptMember({
          idRoom: idRoom,
          member:member
        });
        dispatch(action)
    };

    const handleDeleteMember = (idRoom: string, idGroup: string , idMember: string) => {
        if(role != 'Admin') return
        const action = actionDeleteMemberByRoom({idGroup: idGroup, idMember: idMember, idRoom: idRoom});
        dispatch(action)
    }

    if(!nowListMemberByRoom) return <></>;

    let users = [...nowListMemberByRoom];
        
    function compareRole(userA: TypeMember, userB: TypeMember) {
        const roleOrder = { Admin: 0, Lead: 1, Member: 2 };

        if (userA.status === 'waiting') {
            if (userB.status === 'waiting') {
                return roleOrder[userA.role] - roleOrder[userB.role];
            } else {
                return -1;
            }
        }

        else if (userB.status === 'waiting') {
            return 1;
        } else {
            return roleOrder[userA.role] - roleOrder[userB.role];
        }
    };

    users.sort(compareRole);

    if(!idGroup) return <></>
  return (
    <div className='rol overflow-y-auto  h-[350px]'>
        {users && users.map((member, index) => {

            return (
                  
                <div key={index} className='relative  p-2 border-b-2  flex border-gray-300 mt-2 justify-between '>
                    <div className='flex  '>
                        <div className='h-[50px] mr-2 flex items-center justify-center w-[50px] rounded-full bg-gray-300'>
                            <UserOutlined/>
                        </div>
                        <div>
                            <p>{member.name}</p>
                            <p>{member.email}</p>
                        </div>
                    </div>
                    {member.status === 'waiting' && (
                        <div className=' space-x-2'>
                            <button
                                onClick={()=> handeleAcceptMember(member)}
                                className='p-1 hover:shadow-md hover:bg-red-600 bg-red-500 text-white rounded-[5px] font-semibold'>Accept</button>
                            <button className='p-1 hover:shadow-md hover:bg-gray-500 bg-gray-300 text-white rounded-[5px] font-semibold'>Cancel</button>
                        </div>
                    )}
                    {member.status != 'waiting' && (
                        <div>
                            <div 
                                onClick={()=> !option ? setOption(member.email) : setOption('')}
                                className=' cursor-pointer font-semibold flex items-center hover:bg-gray-300 justify-center bg-gray-200 p-1 div-1 w-[100px] text-center rounded-[5px]'
                            >
                                {member.role}
                                <DownOutlined className='ml-1'/>
                            </div>
                            <div className='   div-1 w-[80px] text-center rounded-[5px]'>#{member.idMember}</div>
                        </div>
                    )}
                    {option === member.email && (
                        <div ref={changeRef} className='change  absolute top-[45px] z-[40]  right-2  shadow-lg w-[300px]  bg-white border border-gray-300'>
                            <div>
                                <div className={`p-1 cursor-pointer border border-b-2  ${member.role === 'Admin' ? 'border-l-4 border-2 border-blue-500' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'} `}>
                                    <p className=' font-semibold'>Admin</p>
                                    <p className='text-[12px]'>is a member with all powers and cannot be changed</p>
                                </div>
                                <div 
                                    onClick={() => !changeRole ? setchangeRole(true) : setchangeRole(false)}
                                    className={`p-1  cursor-pointer  border-b-2  ${member.role === 'Lead' ? 'border-l-4 border-2 border-blue-500' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'} `}
                                >
                                    <p className=' font-semibold'>Lead</p>
                                    <p className='text-[12px]'>can delete, add, and change elements in the room</p>

                                </div>
                                <div className={`p-1 cursor-pointer  border-b-2  ${member.role === 'Member' ? 'border-l-4 border-2 border-blue-500' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'} `}>
                                    <p className=' font-semibold'>Member</p>
                                    <p className='text-[12px]'>Can only be joined and not setting</p>
                                </div>

                                {!deleteMember ? (
                                    <div 
                                        onClick={() => role === 'Admin' && setDeleteMember(member.idMember)}
                                        className={`p-1 cursor-pointer  border-b-2 hover:bg-gray-200   ${role === 'Admin' ? '' : ' bg-gray-200 text-gray-500 cursor-not-allowed'} `}
                                    >
                                        <p className=' font-semibold'>Remove from room</p>
                                    </div>
                                ) : role === 'Admin' && (
                                    <div className='flex space-x-2 p-1 cursor-pointer  border-b-2'>
                                        <button 
                                            onClick={()=> handleDeleteMember(idRoom, idGroup, member.idMember)}
                                            className='p-1 rounded-[5px] bg-red-500 text-white hover:bg-red-600'>Remove</button>
                                        <button onClick={() => {
                                            setDeleteMember(false); console.log('123', deleteMember);
                                        }} className='p-1 rounded-[5px] bg-gray-400 text-white hover:bg-gray-500'>Cancel</button>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
                   
            )
  
        })}
    </div>

  )
}
