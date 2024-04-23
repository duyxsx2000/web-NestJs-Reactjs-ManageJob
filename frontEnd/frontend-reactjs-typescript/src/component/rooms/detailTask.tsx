import React, { useEffect, useState } from 'react'
import { IDs3, Task } from '../../types/typesSlice'
import DOMPurify from 'dompurify';

import {
    PlusOutlined,
    TeamOutlined,
    DashOutlined,
    CloseOutlined,
    DeleteOutlined,
    UserOutlined,
    BellOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import EditorBox from '../form/editorBox';
import { tree } from 'next/dist/build/templates/app-page';
import '../../styles/postJob.css'
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import { actionGetDataTask } from '../../services/actions/getDataRoom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loading from '../loading';
import { delateTask } from '../../redux/slices/roomSlice';
type Props = {
    onClick: () => void,
    idTask: string,
    ids:IDs3

}
const listTest = [1,2,3,4,5,6,7,8,9,0]
export default function DetailTask({
    onClick,
    idTask,
    ids

}: Props) {
    const [title, setTitle] = useState('Task Name')
    const [edit, setEdit] = useState('')
    const [actions, setActions] = useState<string[]>([''])
    const [action, setAction] = useState('')
    const dataTask = useSelector((state: RootState) => state.rooms.dataTask)
    const profile = useSelector((state: RootState) => state.auth.profile)
    const [updateTask, setUpdateTask] = useState<Task | undefined>(undefined)
    const [value, setValue] = useState('')
    console.log(ids);
    const dispatch = useDispatch()

    useEffect(() => {
        const action = actionGetDataTask(ids)
        dispatch(action)
    },[])

    useEffect(() => {
        if(dataTask) {
            setUpdateTask(dataTask);
            console.log(dataTask,'tttttttttttttttttttttttt');
            
        }
    },[dataTask])

    const handleChangeBoxDetail = (value: any) => {
        setValue(value);

    };


    const handleChangeBoxAction = (value: string) => {
        setAction(value);
        if(!updateTask) return
        setUpdateTask({
            ...updateTask,
            detail: value
        })

        

    };

    const handleSaveDetail = () => {
        console.log(updateTask);
        setEdit('')
        
        
    };

    const handleSaveAction = () => {
        setActions([...actions, action])
        if(!updateTask) return
        const cloneAction = [...updateTask.actions, action]

        
        setEdit('')
    }
    return (
    <div className=' h-full bg-[rgba(226,225,225,0.2)]'>
       

                <div className=' h-[50px] bg-green-500  relative text-white font-semibold text-[20px]'>
                    <CloseOutlined onClick={()=> {onClick(); dispatch(delateTask(''))}} className=' absolute right-2 top-2'/>
                </div>
            <div className='flex  h-full justify-center pt-2'>
                <div className='w-[75%] px-4 overflow-auto'>
                    <div className=' w-full  '>
                        <input
                            value={title}
                            className=' outline-green-400 w-full p-1  focus:bg-white text-[16px] font-semibold'
                            onChange={(e)=> setTitle(e.target.value)}
                        />
                    </div>
                    <div className='p-1 ml-[20px]'>
                        <p className='text-[14px] '>ID 123yre1 \ 13/5/2024</p>
                    </div>
                    <div className='p-1 ml-[20px] mt-[10px] flex'>
                        <div className='w-1/3'>
                            <p className=' font-normal'>Thành viên</p>
                            <div className='flex  mt-2'>
                                <div className=' rounded-full w-[30px] h-[30px] bg-gray-300 flex justify-center items-center text-white'><PlusOutlined /></div>
                                <div className='ml-2 rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'><UserOutlined/></div>
                                <div className='flex items-end ml-1'>24</div>   
                            </div>
                        </div>
                        <div>
                            <p className=' font-normal' >Deadline</p>
                            <div className='mt-4'>13/5/2024</div>
                        </div>
                    </div>
                    <div className=' h-[64%] rol mt-4 overflow-y-auto  overflow-x-hidden '>
                        <div className=' p-1 text-[16px] font-semibold mt-2 flex justify-between'>
                            <p>Detail</p>
                            {edit != 'detail' && (
                                <button type='button' onClick={(() => {setEdit('detail')})} className='p-1 w-[70px] bg-gray-300 rounded-[5px]'>Edit</button>
                            )}
                        </div>
                        {edit != 'detail' ? (
                            <div>
                                {
                                    !value ? (
                                        <div onClick={()=> setEdit('detail')} className='p-2 mt-2 ml-[20px] h-[50px] rounded-[5px] bg-gray-300 w-ful'>
                                            <p>Add detail task ...</p>
                                        </div>
                                    ) : (
                                        <div onClick={()=> setEdit('detail')} className='p-2 mt-2 ml-[20px] ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}>
                                        </div>
                                    )
                                }
                            </div>
                        ) : edit === 'detail' && (
                            <div className='mt-2'>
                                <EditorBox height='' value={value} onChange={handleChangeBoxDetail}/>
                                <button 
                                    className='p-1 mt-2 w-[70px] bg-green-500 rounded-[5px] text-white font-medium' 
                                    onClick={() => handleSaveDetail()}>
                                    Save
                                </button>
                                <button 
                                    className='p-1 ml-2 mt-2 w-[70px] bg-gray-300 rounded-[5px] text-white font-medium' 
                                    onClick={() => {setEdit(''); console.log(value)}}>
                                    Cancel
                                </button>
                                
                            </div>
                        )}
                        <div className=' p-1 text-[16px] font-semibold mt-2'>Action</div>
                        <div className='flex space-x-4 items-center'>
                            <div className=' ml-[20px] rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'><UserOutlined/></div>
                            {edit != 'action' ? (
                                <div onClick={() => setEdit('action')} className='p-1 grow  shadow-sm shadow-gray-300 rounded-[5px]'> write a comment...</div>
                            ) : edit === 'action' && (
                                <div className='w-5/6'>
                                    <EditorBox height='' value={action} onChange={handleChangeBoxAction}/>
                                    <button 
                                        className='p-1 mt-2 w-[70px] bg-green-500 rounded-[5px] text-white font-medium' 
                                        onClick={() => handleSaveAction()}>
                                        Send
                                    </button>
                                    <button 
                                        className='p-1 ml-2 mt-2 w-[70px] bg-gray-300 rounded-[5px] text-white font-medium' 
                                        onClick={() => {setEdit(''); console.log(value)}}>
                                        Cancel
                                    </button>
                                </div>
                                
                            )}
                        </div>
                        {actions && actions.map((item, index) => (
                            <div key={index} className='flex space-x-4 items-start mt-3'>
                                <div className=' ml-[20px] rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'>
                                    <UserOutlined/>
                                </div>
                                <div className='w-5/6'>
                                    <div className='flex'>
                                        <p className=' font-medium'>Duy Đỗ</p>
                                        <p className=' text-gray-400 text-[12px] flex items-center ml-2'>2 phút trước</p>
                                    </div>
                                    <div className='p-1 grow  shadow-gray-300  shadow-sm rounded-[5px] w-full' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}></div>
                                </div>
                            </div>
                        ))}
                        <div></div>
                        
                    </div>
                </div>
                <div className='w-[25%] p-4  font-semibold mt-[30px] space-y-2 '>
                    <div className='py-1 px-3 bg-gray-300 rounded-[5px] flex items-center'>
                        <UserOutlined className='mr-2' />
                        Join  
                    </div>
                    <div className='py-1 px-3 bg-gray-300 rounded-[5px] flex items-center'>
                        <BellOutlined className='mr-2'/>
                        Notification
                    </div>
                    <div className='py-1 px-3 bg-gray-300 rounded-[5px] flex items-center'>
                        <ScheduleOutlined className='mr-2' />
                        Deadline
                    </div>
    
                </div>
            </div>
    </div>
    )
}
