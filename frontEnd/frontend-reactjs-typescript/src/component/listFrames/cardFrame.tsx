import React from "react";
import { Task } from "../../types/typesSlice";
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
            className="p-2 rounded-[5px] bg-white  mt-2 border-[2px] hover:border-green-500 ">
            {task.title}
        </div>
    )
};
export default CardFrame;
