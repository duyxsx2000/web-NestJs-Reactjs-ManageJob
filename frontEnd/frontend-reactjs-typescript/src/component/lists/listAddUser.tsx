import React, { useState, useEffect } from 'react'
import {
  CloseOutlined,
  UserAddOutlined,
  SearchOutlined,
  CheckOutlined,
  CaretDownOutlined

} from '@ant-design/icons';
import Stick from '../actions/stick';
import { MemberGroup, TypeMember } from '../../types/typesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
    listMember: MemberGroup[]
    onClick: (id: string, role: string, name: string, email: string) => void
}
export default function ListAddUser({listMember, onClick}: Props) {
    const profile = useSelector((state: RootState) => state.auth.profile)
    const [search, setSearch] = useState('')


    useEffect(()=> {
        const listSearch = listMember.filter(member => member.name.includes(search));
        console.log(listSearch);
    },[search])
    
    if(!profile) return <></>

    return (
        <div className=' absolute w-[300px] h-[350px] bg-white -left-[105%] -top-12 rounded-[5px]'>
            <div className='p-2'>
                <div className='border-2 border-gray-300 rounded-[5px] flex items-center p-1'>
                    <input 
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        className=' outline-none grow'
                        placeholder='Search name'
                    />
                    <SearchOutlined />
                </div>
            </div>
            <div className='overflow-auto h-[85%]'>
                <ul className='list-none  p-2 '>
                    {listMember.map((member, index) => (
                        <li key={index} className='p-1 m-0 border-b  border-gray-300'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p>{member.name}</p>
                                    <p className='text-[10px]'>{member.email}</p>
                                </div>
                                <Stick 
                                    onClick={onClick} 
                                    id={member.idMember} 
                                    name={member.name} 
                                    email={member.email}
                                    type={member.idMember === profile.idUser ? 'create' : 'add'}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
