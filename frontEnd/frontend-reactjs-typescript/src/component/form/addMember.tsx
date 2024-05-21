import React, { useEffect, useRef, useState } from 'react'
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
import ListUser from '../lists/listUser';
import '../../styles/postJob.css'
import { MemberGroup } from '../../types/typesSlice';
import { useDispatch } from 'react-redux';
import { actionAddMemberForRoom, actionReqToJoinRoom } from '../../services/actions/getDataRoom';

type Props = {
    clickClose: () => void,
    idRoom: string
}
export default function AddMember({
    clickClose,
    idRoom
}: Props) {
    const members = useSelector((state: RootState) => state.rooms.data.room?.members);

    const memberByGroup = useSelector((state: RootState) => state.group.data?.members);
    const [membersfilter, setMemberFilter] = useState<MemberGroup[] | undefined>(undefined)
    const inputRef = useRef<HTMLInputElement>(null)
    const profile = useSelector((state:RootState) => state.auth.profile)
    const idGroup = useSelector((state:RootState) => state.group.data?.idGroup)
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const [searchMember, setSearchMember] = useState('')

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setSearchMember('')
                setMemberFilter(undefined);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    const handleOnchangeSearchMemberValue = (e: any) => {
        setSearchMember(e.target.value);

        if(!memberByGroup || !members) return;
        const coppyUsers = memberByGroup.filter((member) => !members.find( mem => mem.idMember === member.idMember))
        const filteredMembers = coppyUsers.filter(member =>
           !member.idMember.includes('') || member.name.toLowerCase().includes(searchMember.toLowerCase())
        );

        setMemberFilter(filteredMembers)
    };

    const handleOnchangeSearchMemberClick = (email: string) => {
        setSearchMember(email);

        if(!memberByGroup) return;

        const filteredMembers = memberByGroup.filter(member =>
            member.email.toLowerCase().includes(email.toLowerCase())
        );

        setMemberFilter(filteredMembers)
    };


    const handlePostReqJoinRoom = (idRoom: string, idGroup: string, email: string) => {
        if(!memberByGroup) return;

        const member = memberByGroup.find(member => member.email === email);
        
        if(!member) return;

        const action = actionAddMemberForRoom({idRoom:idRoom, idGroup: idGroup, idMember: member.idMember});
        dispatch(action);
    };

    if(!idGroup) return <></>
  return (
    <div>
        <div className=' relative p-4'>
            <p className=' font-semibold text-[20px]'>Members</p>
            <span
                onClick={()=>clickClose()}
                className='absolute text-[20px] flex items-center right-5 top-5'>
                <CloseOutlined></CloseOutlined>
            </span>
        </div>
        <div className=' flex p-4 justify-between'>
            <div ref={inputRef} className='w-[60%] relative'>
                <input
                    className='w-full rounded-[5px] outline-none border-2 border-gray-300 p-2'
                    placeholder='Email or Name'
                    value={searchMember}
                    onChange={(e) => handleOnchangeSearchMemberValue(e)}
                ></input>
                {membersfilter &&
                    <div className='rol space-y-2 absolute overflow-auto w-full  z-50 bg-white max-h-[200px] p-2 border-gray-300 border'>
                        { membersfilter.map((member, index) => (
                            <div 
                                key={index}
                                onClick={() => {
                                    handleOnchangeSearchMemberClick(member.email);
                                    setEmail(member.email)
                                }}
                                className='border-b border-gray-300 flex bg-white'>
                                <div className='h-[50px] mr-2 flex items-center justify-center w-[50px] rounded-full bg-gray-300'>
                                    <UserOutlined/>
                                </div>
                                <div>
                                    <p>
                                        {member.name}
                                    </p>
                                    <p>{member.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex h-[45px]'>
                <button className='flex rounded-[5px] items-center justify-between p-2 w-[100px] bg-gray-200 hover:bg-gray-400 font-semibold ml-2'>
                    Member
                    <DownOutlined />
                </button>
                <button 
                    onClick={() => handlePostReqJoinRoom(idRoom, idGroup, email)}
                    className='flex rounded-[5px] items-center p-2 w-[80px] bg-blue-500 hover:bg-blue-600 text-white justify-center font-semibold ml-2'>
                    Add
                </button>
            </div>
        </div>
        <div className='p-2'> 
            <ListUser idRoom={idRoom}/>
        </div>
    </div>
  )
}
