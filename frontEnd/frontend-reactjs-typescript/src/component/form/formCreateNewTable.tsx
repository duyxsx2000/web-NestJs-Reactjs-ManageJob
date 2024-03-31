import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CreateTable } from '../../types/typesSlice';
import { actionCreateNewTable } from '../../services/actions/createNewData';
import {
    PlusOutlined,
    TeamOutlined,
    DashOutlined,
    CloseOutlined
  } from '@ant-design/icons';

type Props = {
    onClick: () => void,
    idRoom: string
}
const FormCreateNewTable = ({
    onClick,
    idRoom
}: Props) => {
    console.log(idRoom,'id');
    

    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const [createTable, setCreateTable] = useState<CreateTable> ({
      idRoom: idRoom,
      title: ''
    })

    useEffect(() => {
      if(!inputRef.current) return
      inputRef.current.focus();
    },[]);
  
    const handleCreateTable = (createTable: CreateTable) => {
      const actionCreateTable = actionCreateNewTable(createTable)
      dispatch(actionCreateTable)
      setCreateTable({
        ...createTable,
        title:''
      })
    };
  return (
    <div className='w-full p-1 rounded-[5px] bg-white'>
        <input
            ref={inputRef}
            placeholder='Enter table title'
            className='w-full p-2 outline-green-500'
            value={createTable?.title}
            onChange={(e) => setCreateTable({
              ...createTable,
              title: e.target.value
            })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createTable && handleCreateTable(createTable);
              }
          }}
        />
        <div className='flex'>
        <button
            type='button'
            className='p-2 bg-green-500 w-1/2 mt-2 text-white font-medium rounded-[5px]'
            onClick={() => createTable && handleCreateTable(createTable)}
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
export default FormCreateNewTable
