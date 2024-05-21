import React, { useState } from "react";
import { TitleRoom, TypeRoom } from "../../types/typesSlice";
import { backgroundColor } from "../../styles/color";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { actionReqToJoinRoom } from "../../services/actions/getDataRoom";
import { useDispatch } from "react-redux";

type Props = {
    titleRoom: TypeRoom,
    type?: 'waiting' | 'join' 
}
const RoomCard = ({titleRoom, type}: Props) => {
    const profile = useSelector((state:RootState) => state.auth.profile)
    const idGroup = useSelector((state:RootState) => state.group.data?.idGroup)
    const status = titleRoom.members.find(member => member.idMember === profile?.idUser)
    const dispatch = useDispatch()

    const handlePostReqJoinRoom = (idRoom: string, idGroup: string) => {
        if(status?.status === 'waiting' || status?.status === 'join') return
        const action = actionReqToJoinRoom({idRoom:idRoom, idGroup: idGroup, status: 'waiting'})
        dispatch(action)
    }
   
   if(!profile || !idGroup) return <></>

    if(type === 'waiting') return (
        <div 
            className={`group relative w-full h-full  cursor-pointer rounded-[5px] ${backgroundColor[titleRoom.background]}  hover:shadow-lg  shadow-md shadow-gray-400 p-2`}
        >   
            <div className="group-hover:flex absolute hidden rounded-[5px] justify-center  items-end w-full h-full top-0 space-x-2  text-white left-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent">
                <p className="  font-semibold p-1 px-2 mb-1 w-full text-center ">
                    Waiting for admin approval
                </p>
            </div>
            <p className={` text-[17px] ${titleRoom.background != 'none' ? 'text-white' : 'text-black'}  font-medium`}>{titleRoom.title}</p>
            <p className={`${titleRoom.background != 'none' ? 'text-white' : ''}`}>{titleRoom.mainTask}</p>
        </div>
    )

    if(type === 'join') return (
        <Link to={`/room/${titleRoom.idRoom} `}>
            <div 
                className={`group relative w-full h-full  cursor-pointer rounded-[2px] ${backgroundColor[titleRoom.background]}  hover:shadow-md  shadow-lg shadow-gray-400 p-2`}
            >
                <p className={` text-[17px] ${titleRoom.background != 'none' ? 'text-white' : 'text-black'}  font-medium`}>{titleRoom.title}</p>
                <p className={`${titleRoom.background != 'none' ? 'text-white' : ''}`}>{titleRoom.mainTask}</p>
            </div>
        </Link>
    )

    return (

        <div 
            onClick={()=> handlePostReqJoinRoom(titleRoom.idRoom, idGroup)}
            className={`group  relative w-full h-full  cursor-pointer rounded-[5px] ${backgroundColor[titleRoom.background]}  hover:shadow-lg   shadow-gray-400 p-2`}
        >   
            {!status && (
                <div className=" group-hover:flex absolute hidden rounded-[5px] justify-center  items-end w-full h-full top-0 space-x-2  text-white left-0 bg-gradient-to-t from-[rgba(187,186,186,0.8)] to-transparent">
                    <button className=" hover:text-blue-600 font-semibold p-1 px-2 mb-1 ">Join</button>
                </div>
            )}
            <p className={` text-[17px] ${titleRoom.background != 'none' ? 'text-white' : 'text-black'}  font-medium`}>{titleRoom.title}</p>
            <p className={`${titleRoom.background != 'none' ? 'text-white' : ''}`}>{titleRoom.mainTask}</p>
  
        </div>
    )





}
export default RoomCard;