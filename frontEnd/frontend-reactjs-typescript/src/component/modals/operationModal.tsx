import React, {useState, useRef, useEffect} from 'react'
import {
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { actionEditTable } from '../../services/actions/editdataTask';
import { EditTable } from '../../types/typesSlice';
import { useDispatch } from 'react-redux';
type Props = {
    clickCloseModal: () => void,
    idTable: string,
    idRoom: string
}
const OperationModal = ({
    clickCloseModal,
    idTable,
    idRoom
}: Props) => {

    const [editTable, setEditTable] = useState<EditTable>({
        idRoom: idRoom,
        idTable: idTable,
        action: 'DELETE'
    });
    const dispatch = useDispatch()
    const handleAction = () => {
        const actionDeleteTable = actionEditTable(editTable);
        dispatch(actionDeleteTable);
        clickCloseModal()
    }
  return (
    <div className=' absolute  w-[250px] h-[400px] rounded-[5px] bg-white -top-[10px] -right-[200px] z-[90]'>
        <div className='flex p-2 items-center '>
            <p className=' font-medium text-center  grow'>Operation</p>
            <CloseOutlined onClick={clickCloseModal} />
        </div>
        <div className='mt-3  text-gray-800'>
        <div 
            onClick={() => handleAction()}
            className='flex items-center hover:bg-gray-200 p-2'>
            <DeleteOutlined />
            <p className='ml-2'>Delate table</p>
        </div>
        </div>
    </div>
  )
};

export default OperationModal
