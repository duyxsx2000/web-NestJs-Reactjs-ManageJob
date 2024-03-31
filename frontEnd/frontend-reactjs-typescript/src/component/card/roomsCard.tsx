import React, { useState } from "react";
import { TitleRoom } from "../../types/typesSlice";
import { backgroundColor } from "../../styles/color";
import { Link } from "react-router-dom";

type Props = {
    titleRoom: TitleRoom
}
const RoomCard = ({titleRoom}: Props) => {

    return (
        <Link to={`/room/${titleRoom.idRoom}`}>
            <div 
                className={`group relative w-full h-full cursor-pointer rounded-[2px] ${backgroundColor[titleRoom.background]}  hover:shadow-lg  shadow-md shadow-gray-400 p-2`}
            >
                <p className={` text-[17px] ${titleRoom.background != 'none' ? 'text-white' : ''}  font-medium`}>{titleRoom.title}</p>
                <p className={`${titleRoom.background != 'none' ? 'text-white' : ''}`}>{titleRoom.mainTask}</p>
            </div>
        </Link>
    )
}
export default RoomCard;