import React, {useState, useRef, useEffect} from 'react'
import {
  PlusOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  DeleteOutlined,
  LogoutOutlined,
  SettingOutlined ,
  UserAddOutlined,
  UserOutlined,
  CaretDownOutlined ,
  MenuOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DataTask, TaskList } from '../../types';
import CardFrame from '../listFrames/cardFrame';
import { CreateTable, CreateTask, IDs3, Table, Task, TypeMember, TypeRoom, TypeTable } from '../../types/typesSlice';
import { backgroundColor, backgroundColorBg, backgroundColorBg1, listAbs, listZ } from '../../styles/color';
import { actionCreateNewTable } from '../../services/actions/createNewData';
import { useDispatch } from 'react-redux';
import FormCreateNewTable from '../form/formCreateNewTable';
import OperationModal from '../modals/operationModal';
import { changeTable, setColorG, setTables } from '../../redux/slices/roomSlice';
import { actionUpdateRoom, actionUpdateTable } from '../../services/actions/editdataTask';
import FormCreateNewTask from '../form/formCreateTask';
import '../../styles/postJob.css'
import ModalDefault from '../modals/defaultModal';
import DetailTask from './detailTask';
import { fetchTables } from '../../services/fetchApi/fetchApis';
import { actionAcceptMember, actionFetchTable } from '../../services/actions/getDataRoom';
import '../component.css'
import MenuRoom from '../menus/menuRoom';
import ListUser from '../lists/listUser';
import AddMember from '../form/addMember';
import ModalRoom from '../modals/modalRoom';
type Props = {
  room: TypeRoom
}
export default function RomPage({room}: Props) {
  const listTest = [1,2,3,4,5,6,7,8]
  // const data = useSelector((state: RootState) => state.task.tableList)
  const [isD, setIsD] = useState<string>()
  const idGroup = useSelector((state: RootState) => state.group.data?.idGroup)
  const [listUsers, setListUsers] = useState<null | string>(null)
  const listTable = useSelector((state: RootState) => state.rooms.data.table)
  const [menu, setMenu] = useState(false)
  const [createTable, setCreateTable] = useState(false)
  const [createTask, setCreateTask] = useState<string | boolean>(false)
  const [operationModal, setOperationModal] = useState<number | boolean>(false)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [addMember, setAddMember] = useState(false)
  const [reservePlace, setReservePlace] = useState<{drop: number| null, drag: number| null} | null>(null);
  const [dragPersonTable, setDragPersonTable] = useState<number >(0);
  const [draggedOverPersonTable, setDraggedOverPersonTable] = useState<number | null>(null);
  const [dragPersonTask, setDragPersonTask] = useState<{indexTask: number, indexTable: number} >({indexTask: 0, indexTable: 0});
  const [draggedOverPersonTask, setDraggedOverPersonTask] = useState<{indexTask: number| null, indexTable: number }>({indexTask: null, indexTable: 0});
  const [isDragging, setIsDagging] = useState(false)
  const [action, setAction] = useState(false)
  const [ids, setIds] = useState<IDs3 | undefined>()
  const [detailTask, setDetailTask] = useState<string | undefined>()
  const [newTask, setNewTask] = useState<number>()
  const [color, setColor] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if(!room.tables) return;
    const ids = room.tables.map((table) => table.idTable)
    const actionTable = actionFetchTable(ids);
    dispatch(actionTable)
  },[room]);

  const handleSetTables = (tables: Table[]) => {
    dispatch(setTables(tables))
    const actionchangeTable = actionUpdateRoom({
      idRoom: room.idRoom,
      tables: tables
    })
    
    dispatch(actionchangeTable)
  };

  const handleSetTask = (tables: TypeTable[]) => {
    const actionchangeTable = actionUpdateTable({
      idRoom: room.idRoom,
      tables: tables
    } );

    dispatch(changeTable(tables))
    dispatch(actionchangeTable)
  };

  const handleOnDragTableStart = (e: any, index: number) => {  
    if(isDragging || action ) return;
    setDragPersonTable(index)
  };

  const handleOnDragTableEnter = (e: any, index: number) => {
    if(isDragging ) return;

    setDraggedOverPersonTable(index);

    if(index == dragPersonTable) {
      return;  
    } else {

      if( dragPersonTable > index) {
        setPlaceholderIndex(index+1);
        return
      } 
      else {
        setPlaceholderIndex(index -1)
        return
      };
    } 
  };

  const handleSortTable = (e: any) => {
    if(!room.tables) return;
    if(isDragging) return;
    if(draggedOverPersonTable === null) return;

    const cloneTables = [...room.tables];
    const temp = cloneTables[dragPersonTable];
    
    cloneTables.splice(dragPersonTable, 1);
    cloneTables.splice(draggedOverPersonTable, 0, temp);
    handleSetTables(cloneTables);
    setDraggedOverPersonTable(null);
    setDragPersonTable(0);
    setPlaceholderIndex(null) ; 
  };

  const handleOnDragOver = (e: any) => {
    if(isDragging) return;
    e.preventDefault();
  };

  const handleOnDragStartTask = (
    e: any, 
    indexTask: number, 
    indexTable: number,
    idTask: string
  ) => {
    setIsDagging(true);
    setIsD(idTask)
    setDragPersonTask({
      indexTask : indexTask,
      indexTable: indexTable
    });
    setPlaceholderIndex(indexTask);
  };

  const handleOnDragEnterTask = (
    e: any, 
    indexTask: number, 
    indexTable: number,
  ) => {
    
    if(indexTable != dragPersonTask.indexTable) {
      setNewTask(indexTable)
    };

    setDraggedOverPersonTask({
      indexTask : indexTask,
      indexTable: indexTable
    });

    if(indexTask == dragPersonTable) {
      return; 
    } else {

      if( dragPersonTable > indexTask) {
        setPlaceholderIndex(indexTask+1);
        return;
      } else {
        setPlaceholderIndex(indexTask -1);
        return;
      };
    } 
    
  };

  const handleSortTask = (e: any) => {
    
    if(!listTable) return;
    if(draggedOverPersonTask.indexTask === null) return;
    if(draggedOverPersonTask.indexTable === null) return;
    console.log('aaaaaaaaaaaaaaaaaaaaaaa',draggedOverPersonTask.indexTable);
    if(dragPersonTask.indexTable === draggedOverPersonTask.indexTable) {
      
      const cloneTaskList = [...listTable[dragPersonTask.indexTable].tasks];
      const cloneTable = {...listTable[dragPersonTask.indexTable]}
      let sourceIndex = dragPersonTask.indexTask; // Vị trí hiện tại của phần tử bạn muốn di chuyển
      let targetIndex = draggedOverPersonTask.indexTask; // Vị trí mục tiêu bạn muốn di chuyển phần tử đến
      let elementToMove = cloneTaskList.splice(sourceIndex, 1)[0];
      cloneTaskList.splice(targetIndex, 0, elementToMove);
      console.log(cloneTaskList);
      cloneTable.tasks = cloneTaskList
      handleSetTask([cloneTable])

    } else {
      
      
      const cloneRoomList = JSON.parse(JSON.stringify(listTable));

      //tạo table mới cho mảng bị mất task
      const cloneTableStart = {...cloneRoomList[dragPersonTask.indexTable]};
      const taskMove = cloneTableStart.tasks[dragPersonTask.indexTask]
      cloneTableStart.tasks.splice(dragPersonTask.indexTask,1)
         
      //tạo table mới cho mảng nhận task
      const cloneTableEnd = {...cloneRoomList[draggedOverPersonTask.indexTable]};
      cloneTableEnd.tasks.splice(draggedOverPersonTask.indexTask, 0, taskMove)

      cloneRoomList[dragPersonTask.indexTable] = cloneTableStart;
      cloneRoomList[draggedOverPersonTask.indexTable] = cloneTableEnd;
      console.log(cloneTableStart, cloneTableEnd,'=====');
      handleSetTask([cloneTableStart, cloneTableEnd])
      
    }

    setDraggedOverPersonTask({
      indexTask: null,
      indexTable:0
    });
    setIsDagging(false);    
  };

  const handleOnDragOverTask = (e: any) => {
    e.preventDefault(); 
  };

  const contentTable = (
    table: TypeTable, 
    indexTable: number, 
    type?: 'default' | 'space' 
  ) => {

    return (
      <div
        key={indexTable}
        className={` relative h-full max-w-full `}
        draggable={!action}
        onDragStart={(e) =>handleOnDragTableStart(e, indexTable)}
        onDragEnter={(e) => handleOnDragTableEnter(e, indexTable)}
        onDragEnd={(e) => handleSortTable(e)}
        onDragOver={(e) => handleOnDragOver(e)}
      > 
        {type === 'space' && <div className={`absolute rounded-[5px] z-[90] w-full h-full ${room.background && !color ? backgroundColorBg[room.background] : 'bg-gray-200'}`}></div>}

        <div className={` relative w-[310px] shadow-md rounded-[5px] flex flex-col  max-h-full bg-white active:opacity-100   text-t-1 ${reservePlace?.drag === reservePlace?.drop &&  reservePlace?.drop === indexTable ?'bg-red-800' : ''}`}>
          {operationModal && operationModal === indexTable + 1 && (
            <OperationModal
              idRoom={room.idRoom}
              idTable={table.idTable}
              clickCloseModal={() => {setOperationModal(false)}}
            />
          )}
          <div className="flex justify-between p-3 ">
            <p className="font-[500] ">{table.title}</p>
            <span className="flex items-center">
              <DashOutlined
                onClick={() => {setOperationModal(indexTable + 1)}}
                />
            </span>
          </div>
          <div className='grow rol w-full overflow-auto p-2'>
            <div className='w-full' >
              {table.tasks && table.tasks.map((task, index) => { // -----------------

                if (
                  // original position of dragged task - when on the same table
                  isDragging 
                  && dragPersonTask.indexTask === draggedOverPersonTask.indexTask 
                  && index === dragPersonTask.indexTask 
                  && indexTable === dragPersonTask.indexTable 
                  && dragPersonTask.indexTable === draggedOverPersonTask.indexTable
                ) {        
                  return (
                    <div key={index}>
                      {contentTask(task, index, indexTable, table.idTable, 'space')}
                    </div>    
                  );
                }

                if (
                  // original position of dragged task - when on the same table
                  isDragging 
                  // && dragPersonTask.indexTask === draggedOverPersonTask.indexTask 
                  && index === dragPersonTask.indexTask 
                  && indexTable === dragPersonTask.indexTable 
                  && dragPersonTask.indexTable != draggedOverPersonTask.indexTable
                ) return (
                  <div key={index}>
                    {contentTask(task, index, indexTable, table.idTable, 'space')}
                  </div>    
                );


                if (
                  // task position after drop - when on the same table
                  isDragging 
                  && draggedOverPersonTask.indexTask === index 
                  && index != dragPersonTask.indexTask 
                  && draggedOverPersonTask.indexTable === dragPersonTask.indexTable 
                  && indexTable === dragPersonTask.indexTable 
                ) return (
                  <div key={index}>
                    {contentTask(task, index, indexTable, table.idTable, 'space')}
                  </div>    
                );

                if (
                  //The task location replaces the original location - when on the same table
                  isDragging
                  && draggedOverPersonTask.indexTask 
                  && index < draggedOverPersonTask.indexTask
                  && dragPersonTask .indexTask!= draggedOverPersonTask.indexTask
                  && index >= dragPersonTask.indexTask
                  && indexTable === dragPersonTask.indexTable
                  && draggedOverPersonTask.indexTable === dragPersonTask.indexTable 
                ) return (
                  <div key={index} >
                    {contentTask(table.tasks[index + 1], index, indexTable, table.idTable)}
                  </div>
                );

                if (
                   //The task location replaces the original location - when on the same table
                  isDragging
                  && draggedOverPersonTable != null
                  && draggedOverPersonTask.indexTask 
                  && index > draggedOverPersonTask.indexTask
                  && dragPersonTask .indexTask!= draggedOverPersonTask.indexTask
                  && index <= dragPersonTask.indexTask
                  && indexTable === dragPersonTask.indexTable
                  && draggedOverPersonTask.indexTable === dragPersonTask.indexTable 
                ) return (
                  <div key={index} >
                    {contentTask(table.tasks[index - 1], index, indexTable, table.idTable)}
                  </div>
                );
                
                if(
                  isDragging
                  && draggedOverPersonTask.indexTable === indexTable
                  && dragPersonTask.indexTable !== indexTable
                  && index === draggedOverPersonTask.indexTask
                ) {
                
                  return (
                    <div key={index} >
                      {contentTask(task, index, indexTable, table.idTable, 'space')}
                      {contentTask(table.tasks[draggedOverPersonTask.indexTask], index +1, indexTable,table.idTable)}
                    </div>
                  )
                }

                return (
                  // no drag
                  <div key={index} >
                    {contentTask(task, index, indexTable,table.idTable)}
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            {!createTask || createTask != table.idTable ? (
              <button 
                onClick={() => {setCreateTask(table.idTable); setAction(true)}}
                className={'flex font-[500] items-center w-full rounded-[5px] mt-4 p-1 hover:bg-gray-300'}
              >
                <span className="text-[12px] flex items-center"><PlusOutlined className="mr-2"/></span>
                Add card
              </button>
            ) : createTask === table.idTable && (
              <FormCreateNewTask 
                onClick={() => {setCreateTask(false)}}
                unAction={() => {setAction(false)}}
                setAction={() => {setAction(true)}}
                idTable={table.idTable}
                idRoom={room.idRoom}
              />
            )}

          </div>
        </div>
      </div>
    )
  };

  const contentTask = (
    task:{title: string, idTask: string}| null,
    index: number, 
    indexTable: number,
    idTable: string,
    type?: 'default' | 'space' | 'none'
  ) => {
    if(!task) return 
    console.log(type,'type');
    
    return (
      <div 
        draggable
        onDragStart={(e) =>handleOnDragStartTask(e, index, indexTable ,task.idTask)}
        onDragEnter={(e) => handleOnDragEnterTask(e, index, indexTable)}
        onDragEnd={(e) => handleSortTask(e)}
        onDragOver={(e) => handleOnDragOverTask(e)}
        className=' relative '
      > 
        {type === 'none' && <div className='h-[5px]'></div>}
        {type === 'space' && <div className=' absolute z-[90] w-full h-full bg-gray-100 rounded-[5px]'></div>}
        <div className={`bg-white break-words `}>
          <CardFrame 
            task={task} 
            onClick={() => {
              setDetailTask(task.idTask); 
              setIds({
                idTask: task.idTask,
                idRoom: room.idRoom,
                idTable: idTable
              })
            }}
          />
        </div>
      </div>
    )
  };

  return (
    <div className={`h-full grow overflow-hidden   flex  ${!color ? backgroundColor[room.background] : 'bg-gray-200'}`}>

      {detailTask && ids && (
        <ModalDefault
          height='h-[90vh]'
          width='w-[700px]'
        >
          <DetailTask  
            onClick={() => {setDetailTask(undefined)}}
            idTask={detailTask}
            ids={ids}
          />
        </ModalDefault>
      )}

      {addMember && (
        <ModalRoom
        height='h-[500px]'
        width='w-[600px]'
        type= 'top'
      >
          <AddMember 
            clickClose={()=> setAddMember(false)}
            idRoom={room.idRoom}
          />
      </ModalRoom>
      )}
      <div className={`flex flex-col ${menu ? 'w-3/4' : 'w-full'} `}>
        <div className={`h-[8%] z-[50] border-b border-gray-300 flex w-full items-center p-2 ${!room.background || color ? 'text-black' : 'text-white'} ${color ? 'bg-white' : backgroundColorBg1[room.background]} `}>
          <div className='flex h-full'>
            <p className='font-bold  ml-4 text-[20px]'>
              {room.title}
            </p>
            <p className=' ml-2 text-[10px] h-full flex items-start'>
              {`#${room.idRoom}`}
            </p>
            <div className='flex items-center ml-8'>
              <div 
                onClick={()=> {
                  color ? setColor(false) : setColor(true);
                  color ? dispatch(setColorG(false)) : dispatch(setColorG(true))
                }}
                className={`rounded-[5px] w-[60px] ${!color ? backgroundColorBg[room.background] : 'bg-white'} border border-gray-300  h-2/3`}
              >
                <div className={`w-[30px] ${color ? 'translate-x-full bg-gray-300' : backgroundColorBg1[room.background]} border transition-all rounded-[5px]  h-full`}></div>
              </div>
            </div>

          </div>
          <div className='grow flex justify-end h-full'>
            <div className='w-[300px] relative  border-l border-gray-300 mr-10 cursor-pointer flex   '>

              {room.members.find(user => user.status === 'waiting') && (
                <div className='blinking-dot absolute left-2 -top-1'></div>
              )}
              <div className=' relative w-2/4 ml-4 '>
                <div 
                  onClick={()=> setAddMember(true)}
                  className='flex absolute z-[90] items-center mr-1  ml-1 top-1'>
                  <span className='text-[20px] text-white justify-center w-[50px] h-[30px] flex items-center border-2 bg-gray-400 rounded-full'>
                    <UserAddOutlined/>
                  </span>
                </div>
                {/* <div 
                  onClick={() => {!listUsers ? setListUsers('ggggg') : setListUsers(null)}}
                  className={`absolute w-[30px] h-[30px] bg-red-400 shadow-md  text-white ${listAbs[0]} ${listZ[0]} top-1 rounded-full flex justify-center items-center`}
                >
                  15
                  <div className=' relative'>
                    <span className=' absolute -top-2  -right-[8px]'>
                      <CaretDownOutlined />
                    </span>
                  </div>
                </div>  */}
                {room.members.map((member,index) => index <= 5 ? (
                  <div className={`absolute w-[30px] h-[30px] ${index % 2 ? 'bg-gray-400' : 'bg-red-400'} text-white ${listAbs[index +1]} ${listZ[index +1]} top-1 rounded-full flex justify-center items-center`}>
                    <UserOutlined  />
                  </div> 
                ) : <></>
                )}
              </div>
              {room.members.length > 6 && <div className='flex items-end h-full justify-center ml-[5px]'> <DashOutlined /> </div>}

            </div>

            {!menu && (
              <div 
                onClick={()=> setMenu(true)}
                className='flex items-center m2-6 text-[20px] text-black'>
                <MenuOutlined />
              </div>
            )}
          </div>
        </div>

        <div className=' w-full h-[92%]  overflow-x-auto'>   
          <div className='h-full w-full ' >
            <div className='aa overflow-x-auto overflow-y-hidden p-3 h-full w-full space-x-4 flex' >
              {listTable && listTable.map((list, indexTable) => { 
                
                if (dragPersonTable === draggedOverPersonTable && dragPersonTable === indexTable) return (
                  <div key={indexTable}>
                    {contentTable(list, indexTable, 'space')}
                    
                  </div>
                );

                if (
                  draggedOverPersonTable === indexTable 
                  && indexTable!= dragPersonTable
                ) return (
                  <div key={indexTable}>
                    {contentTable(list, indexTable, 'space')}
                  </div>
                );

                if (
                  draggedOverPersonTable 
                  && indexTable < draggedOverPersonTable 
                  && dragPersonTable != draggedOverPersonTable
                  && indexTable >= dragPersonTable
                ) return (
                  <div key={indexTable}>
                    {contentTable(listTable[indexTable + 1], indexTable, 'default'  )}
                  </div>
                )
                ;

                if (
                  draggedOverPersonTable != null
                  && indexTable > draggedOverPersonTable 
                  && dragPersonTable != draggedOverPersonTable
                  && indexTable <= dragPersonTable
                ) return (
                  <div key={indexTable}>
                    {contentTable(listTable[indexTable - 1], indexTable, 'default'  )}
                  </div>
                );

                return (
                  <div key={indexTable}>
                    {contentTable(list, indexTable, 'default')}
                  </div>
                )
              })}

              {/* create table */}
              <div className='min-w-[270px] '>
                {!createTable ? (
                  <div
                    onClick={() => setCreateTable(true)} 
                    className={`w-full font-medium rounded-[5px] border ${!room.background ? 'bg-gray-400 hover:bg-gray-500' : ''}  hover:bg-[rgba(80,79,79,0.37)] bg-[rgba(228,226,226,0.37)] text-white shadow-md p-2`}
                  >
                    <p className='flex items-center'> <PlusOutlined className='mr-2' /> Create new Table</p>
                  </div>
                ) : (
                  <FormCreateNewTable 
                    onClick={() => {setCreateTable(false)}}
                    idRoom={room.idRoom}
                  />
                )}
              </div>    
            </div>            
          </div>
        </div>
      </div>
      {menu && idGroup && (
        <MenuRoom
          room={room}
          onClickClose={()=> {setMenu(false)}}
          idGroup={idGroup}
          idRoom={room.idRoom}
          onClickUsers={()=> {listUsers ? setListUsers('') : setListUsers('1')}}
        />
      )}
    </div>
  )
}
