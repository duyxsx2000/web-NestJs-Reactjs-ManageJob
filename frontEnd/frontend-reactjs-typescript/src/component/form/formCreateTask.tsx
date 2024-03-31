import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CreateTable, CreateTask } from '../../types/typesSlice';
import { actionCreateNewTable, actionCreateNewTask } from '../../services/actions/createNewData';
import {
    PlusOutlined,
    TeamOutlined,
    DashOutlined,
    CloseOutlined
  } from '@ant-design/icons';

type Props = {
    onClick: () => void,
    idTable: string,
    idRoom: string
}
const FormCreateNewTask = ({
    onClick,
    idTable,
    idRoom
}: Props) => {
    console.log(idTable,idRoom,'id');
    

    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const [createTask, setCreateTask] = useState<CreateTask> ({
        idRoom: idRoom,
        idTable: idTable,
        title: ''
    })

    useEffect(() => {
      if(!inputRef.current) return
      inputRef.current.focus();
    },[]);
  
    const handleCreateTask = (createTask: CreateTask) => {
      const actionCreateTask = actionCreateNewTask(createTask);
      dispatch(actionCreateTask);
      setCreateTask({
        ...createTask,
        title:''
      })
    };
 
  return (
    <div className='w-full p-1 rounded-[5px] bg-white'>
        <input
            ref={inputRef}
            placeholder='Enter task title'
            className='w-full p-2 outline-green-500'
            value={createTask?.title}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    createTask && handleCreateTask(createTask);
                }
              }}
            onChange={(e) => setCreateTask({
                ...createTask,
                title: e.target.value
            })}
        />
        <div className='flex'>
        <button
            type='button'
            className='p-2 bg-green-500 w-1/2 mt-2 text-white font-medium rounded-[5px]'
            onClick={() => createTask && handleCreateTask(createTask)}
        >
            Create
        </button>
        <span className='flex items-center ml-2 text-[20px] mt-2 '>
            <CloseOutlined onClick={onClick} />
        </span>
        </div>
    </div>
  )
};
export default FormCreateNewTask
