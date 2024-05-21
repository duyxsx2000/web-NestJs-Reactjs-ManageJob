import React from "react";
import { Task } from "../../types/typesSlice";
import {UserOutlined} from '@ant-design/icons';
type Props = {
    task: {title: string, idTask:string},
    action?: string 
    type?: 'default' | 'space' | 'none',
    onClick: () => void
}
const CardFrame = ({task, action, type, onClick}: Props) => {

    return (
        <div
            onClick={onClick}
            className="p-2 rounded-[5px] bg-white flex  mt-2 border-[2px] cursor-pointer hover:border-green-500 "
        >
            <div className="w-[90%]">
            {task.title}
            </div>
            
            <UserOutlined />

 
        </div>
    )
};
export default CardFrame;
