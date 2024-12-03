import React, { useEffect, useRef, useState } from 'react'
import { IDs3, MemberTask, Task, TypeMember, UpdateTaskDto } from '../../types/typesSlice'
import DOMPurify from 'dompurify';

import {
    PlusOutlined,
    TeamOutlined,
    DashOutlined,
    CloseOutlined,
    DeleteOutlined,
    UserOutlined,
    BellOutlined,
    ScheduleOutlined,
    FieldTimeOutlined,
    EditOutlined
} from '@ant-design/icons';
import EditorBox from '../form/editorBox';
import '../../styles/postJob.css'
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import { actionGetDataTask } from '../../services/actions/getDataRoom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loading from '../loading';
import { delateTask, setActionTask, setDetailTask, setMemberTask } from '../../redux/slices/roomSlice';
import { calculateDaysDifference, getStringDate } from '../../utils/date';
import DateInput from '../modals/dateInput';
import { actionUpdateMembrTask, actionUpdateTask } from '../../services/actions/editdataTask';
import { ChangeMember, UserAuth } from '../../types';
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
    const dataTask: Task | undefined = useSelector((state: RootState) => state.rooms.dataTask);
    const memberOfRoom: TypeMember[] | undefined = useSelector((state: RootState) => state.rooms.data.room?.members);
    const profile: UserAuth | null = useSelector((state: RootState) => state.auth.profile);
    const [title, setTitle] = useState<string | undefined>(dataTask?.title);
    const [edit, setEdit] = useState<string>('');
    const [deadline, setDeadline] = useState<boolean>(false);
    const [members, setMembers] = useState<boolean>(false)
    const [actions, setActions] = useState<string[]>(['']);
    const [searchMember, setSearchMember] = useState<string>('')
    const [memberByS, setMemberByS] = useState<MemberTask[] | undefined>(undefined)
    const [action, setAction] = useState<string>('');
    const [actionChangeTitle, setActionChangeTitle] = useState<boolean>(false);
    const [updateTask, setUpdateTask] = useState<Task | undefined>(undefined);
    const [valueDetail, setValueDetail] = useState<string>('');

    const dispatch = useDispatch();

    const dateInput = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const action = actionGetDataTask(ids);
        dispatch(action);  
    },[])

    useEffect(() => {
        if(dataTask) {
            setUpdateTask(dataTask);       
        }
    },[dataTask]);

    const handleUpdateTask = (updateTask: UpdateTaskDto) => {
        const action = actionUpdateTask(updateTask);
        dispatch(action)
    }

    const handleChangeBoxDetail = (value: any) => {
        setValueDetail(value);
    };

    const handleChangeBoxAction = (value: string) => {
        setAction(value);

        if(!updateTask) return

        setUpdateTask({
            ...updateTask,
            detail: value
        });

    };

    const handleSaveDetail = (updateTask: UpdateTaskDto) => {
        setEdit('');
        dispatch(setDetailTask(valueDetail))
        handleUpdateTask(updateTask)

    };

    const handleSaveAction = (updateTask: UpdateTaskDto) => {
        setActions([...actions, action]);

        if(!updateTask.actions) return

        handleUpdateTask(updateTask);
        dispatch(setActionTask(updateTask.actions));
        setEdit('');
    };

    const handleChangeMember = (changeMember: ChangeMember) => {
        const action = actionUpdateMembrTask(changeMember);
        dispatch(action)
    }

    if(!profile || !dataTask || !memberOfRoom ) return <></>

    return (
    <div className=' h-full bg-[rgba(220,217,217,0.2)] '>
    
        <div className=' h-[50px] bg-green-500  relative text-white font-semibold text-[20px]'>
            <CloseOutlined onClick={()=> {onClick(); dispatch(delateTask(''))}} className=' absolute right-2 top-2'/>
        </div>
        <div className='flex  h-full justify-center pt-2'>
            <div className='w-[75%] px-4 overflow-auto'>
                <div className=' w-full  '>
                    {!actionChangeTitle ? (  
                        <div className='flex items-center'>
                            <p className=' p-1  focus:bg-white text-[16px] font-semibold'>{title ? title : dataTask.title}</p>
                            < EditOutlined 
                                style={{fontSize:'13px'}} 
                                className='ml-1' 
                                onClick={()=> {
                                    setActionChangeTitle(true);
                                    setTitle(dataTask.title);
                                }}  
                            />
                        </div>
                    ) : (
                        <div className='flex'>
                            <input
                                ref={titleInputRef}
                                value={title}
                                className=' outline-green-200 w-full p-1  focus:bg-white text-[16px] font-semibold'
                                onChange={(e)=> setTitle(e.target.value)}
                            />
                            <button 
                                onClick={()=> {
                                    setActionChangeTitle(false);
                                    handleUpdateTask({
                                        change:'title',
                                        idTable: ids.idTable,
                                        idTask: dataTask.idTask,
                                        title: title
                                    });
                                    
                                }}
                                className='p-1 bg-green-400 text-white hover:bg-green-500 font-semibold'>Save</button>
                        </div>
                    )}

                </div>
                <div className='p-1 ml-[20px]'>
                    <p className='text-[14px] '>#{dataTask.idTask} \ {getStringDate(dataTask.dates.datePost)}</p>
                </div>
                <div className='p-1 ml-[20px] mt-[10px] flex'>
                    <div className='w-1/3'>
                        <p className=' font-normal'>Thành viên</p>
                        <div className='flex  mt-2'>
                            <div className=' rounded-full w-[30px] h-[30px] bg-gray-300 flex justify-center items-center text-white'><PlusOutlined /></div>
                            <div className='ml-2 rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'><UserOutlined/></div>
                            <div className='flex items-end ml-1'>{dataTask?.members.length}</div>   
                        </div>
                    </div>
                    <div>
                        <p className=' font-normal' >Deadline</p>
                        <div className='mt-4 flex space-x-4'>
                            <span>{getStringDate(dataTask.dates.dateDeadlineEnd)}</span>
                            <span className='flex items-center'>
                                <FieldTimeOutlined className='mr-1' />
                                {calculateDaysDifference(dataTask.dates.dateDeadlineEnd)} day
                            </span>
                        </div>
                    </div>
                </div>
                <div className=' h-[64%] rol mt-4 overflow-y-auto  overflow-x-hidden '>
                    <div className=' p-1 text-[16px] font-semibold mt-2 flex justify-between'>
                        <p>Detail</p>
                        {edit != 'detail' && (
                            <button 
                                type='button' 
                                onClick={(() => {
                                    setEdit('detail');
                                    setValueDetail(dataTask.detail)
                                })} 
                                className='p-1 w-[70px] bg-gray-300 rounded-[5px]'
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    {edit != 'detail' ? (
                        <div>
                            {
                                !valueDetail && !dataTask.detail ? (
                                    <div 
                                        onClick={()=> {
                                            setEdit('detail');

                                        }} 
                                        className='p-2 mt-2 ml-[20px] h-[50px] rounded-[5px] bg-gray-300 w-ful'
                                    >
                                        <p>Add detail task ...</p>
                                    </div>
                                ) : (
                                    <div 
                                        onClick={()=> {
                                            setEdit('detail');
                                            if(!dataTask.detail) return
                                            setValueDetail(dataTask.detail)
                                        }} 
                                        className='p-2 mt-2 ml-[20px] ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataTask.detail ? dataTask.detail : '') }}>
                                    </div>
                                )
                            }
                        </div>
                    ) : edit === 'detail' && (
                        <div className='mt-2'>
                            <EditorBox height='' value={valueDetail} onChange={handleChangeBoxDetail}/>
                            <button 
                                className='p-1 mt-2 w-[70px] bg-green-500 rounded-[5px] text-white font-medium' 
                                onClick={() => handleSaveDetail({
                                    idTask: dataTask.idTask,
                                    change:'set Detail',
                                    detail: valueDetail
                                })}>
                                Save
                            </button>
                            <button 
                                className='p-1 ml-2 mt-2 w-[70px] bg-gray-300 rounded-[5px] text-white font-medium' 
                                onClick={() => {setEdit(''); console.log(valueDetail)}}>
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
                                    onClick={() => handleSaveAction({
                                        idTask: dataTask.idTask,
                                        change:'set action',
                                        actions:[
                                            ...dataTask.actions,
                                            {
                                                date: new Date(Date.now()),
                                                name: profile.name,
                                                idMember: profile.idUser,
                                                detail: action

                                            }
                                        ]
                                    })}>
                                    Send
                                </button>
                                <button 
                                    className='p-1 ml-2 mt-2 w-[70px] bg-gray-300 rounded-[5px] text-white font-medium' 
                                    onClick={() => {setEdit(''); console.log(valueDetail)}}>
                                    Cancel
                                </button>
                            </div>
                            
                        )}
                    </div>
                    {actions && dataTask.actions.map((action, index) => (
                        <div key={index} className='flex space-x-4 items-start mt-3'>
                            <div className=' ml-[20px] rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'>
                                <UserOutlined/>
                            </div>
                            <div className='w-5/6'>
                                <div className='flex'>
                                    <p className=' font-medium'>{action.name}</p>
                                    <p className=' text-gray-400 text-[12px] flex items-center ml-2'>{getStringDate(action.date)}</p>
                                </div>
                                <div className='p-1 grow  shadow-gray-300  shadow-sm rounded-[5px] w-full' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(action.detail) }}></div>
                            </div>
                        </div>
                    ))}
                    <div></div>
                    
                </div>
            </div>
            <div className='w-[25%] p-4  font-semibold mt-[30px] space-y-2 '>
                {!dataTask.members.find(member => member.idMember) && !members ? (
                    <div onClick={() => {
                        handleChangeMember({
                            idTask: ids.idTask,
                            action:'Add member',
                            idMember: profile.idUser,
                            idRoom: ids.idRoom,
                            name: profile.name
                        });
                        const coppyMember = [...dataTask.members];
                        coppyMember.push({
                            idMember: profile.idUser,
                            name: profile.name,
                            role: 'Member',
                            notify: true
                        })
                        dispatch(setMemberTask(coppyMember))
                    }} className='py-1 cursor-pointer px-3 bg-gray-200 hover:bg-gray-300 rounded-[5px] h flex items-center'>
                        <UserOutlined className='mr-2' />
                        Join 
                    </div>
                ) : (
                    <div 
                        
                        className=' relative py-1 cursor-pointer px-3 bg-gray-200 hover:bg-gray-300 rounded-[5px] flex items-center'
                    >
                        <span onClick={()=> !members ? setMembers(true) : setMembers(false)} className='flex items-center'>
                            <UserOutlined className='mr-2' />
                            Member 
                        </span>
                        {members && (
                            <div className='absolute p-2 w-[300px]  top-[40px] rounded-[5px] -left-2/3 shadow-sm bg-white z-[70]'>
                                <div className='relative'>
                                    <p className='text-center w-full'>Members</p>
                                    <CloseOutlined onClick={()=> setMembers(false)} className='absolute right-0 top-0'/>
                                    <input
                                        placeholder='Search member'
                                        value={searchMember}
                                        className='w-full p-1 outline-blue-500 mt-2 bg-gray-200 border border-gray-300 rounded-[5px]'
                                        onChange={(e)=> {
                                            setSearchMember(e.target.value);
                                            const coppyMemberInTask = [...dataTask.members];
                                            const coppyMemberInRoom = [...memberOfRoom];
                                            const filteredMembersTask = coppyMemberInTask.filter(member =>
                                                !member.idMember.includes('') || member.name.toLowerCase().includes(searchMember.toLowerCase())
                                            );
                                            const filteredMembersRoom = coppyMemberInTask.filter(member =>
                                                !member.idMember.includes('') || member.name.toLowerCase().includes(searchMember.toLowerCase())
                                            );
                                            
                                        }}
                                    ></input>
                                    <div className='mt-4'>
                                        <p className=' font-semibold text-[12px] text-gray-700'>Member of task</p>
                                        {dataTask.members.length < 1  && <p className='text-center w-full font-semibold text-[12px] text-gray-700'>No data</p>}
                                        {dataTask.members.map((member, index) => (
                                            <div key={index} className='p-2 hover:bg-gray-300 flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <div className='mr-2 rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'><UserOutlined/></div>
                                                    <p>{member.name}</p>
                                                </div>
                                                <CloseOutlined
                                                    onClick={() => {                                                      
                                                        const coppyMembers = [...dataTask.members];
                                                        coppyMembers.splice(index , 1); 
                                                        handleChangeMember({
                                                            idTask: ids.idTask,
                                                            action:'Remove member',
                                                            idMember: member.idMember,
                                                            idRoom: ids.idRoom,
                                                            name: member.name
                                                        }) ;                                                  
                                                        dispatch(setMemberTask(coppyMembers));
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-4'>
                                        <p className=' font-semibold text-[12px] text-gray-700'>Member of room</p>
                                        {memberOfRoom.length < 1 || memberOfRoom.length === dataTask.members.length && <p className='text-center w-full font-semibold text-[12px] text-gray-700'>No data</p>}
                                        { memberOfRoom.filter((member) => !dataTask.members.find(mem => mem.idMember === member.idMember)).map((member, index) => (
                                            <div
                                                onClick={()=> {
                                                    const membercoppy = [...dataTask.members];
                                                    handleChangeMember({
                                                        idTask: ids.idTask,
                                                        action:'Add member',
                                                        idMember: member.idMember,
                                                        idRoom: ids.idRoom,
                                                        name: member.name
                                                    });
                                                    dispatch(setMemberTask(membercoppy));
                                                }}
                                                key={index} 
                                                className='p-2 hover:bg-gray-300 flex items-center justify-between'
                                            >
                                                <div className='flex items-center'>
                                                    <div className='mr-2 rounded-full w-[30px] h-[30px] bg-red-600 flex items-center justify-center text-white'><UserOutlined/></div>
                                                    <p>{member.name}</p>
                                                </div>
                                                <PlusOutlined />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className={`py-1 cursor-pointer px-3 ${dataTask?.members.find(member => member.idMember === profile?.idUser || member.notify) ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 '}  rounded-[5px] flex items-center`}>
                    <BellOutlined className='mr-2'/>
                    Notification
                </div>
                <div 
                    onClick={()=> {
                        setDeadline(true)  
                    }}
                    className=' relative py-1 cursor-pointer px-3 bg-gray-200 hover:bg-gray-300  rounded-[5px] flex items-center'
                >
                    <ScheduleOutlined className='mr-2' />
                    Deadline
                    
                </div>
                {deadline && <DateInput dates={dataTask.dates} idTask={dataTask.idTask} onClick={() => setDeadline(false)}/>}

            </div>
        </div>
    </div>
    )
}
