import React, {useState, useRef, useEffect} from 'react'
import {
  PlusOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DataTask, TaskList } from '../../types';
import CardFrame from '../listFrames/cardFrame';
import { CreateTable, CreateTask, Table, Task, TypeRoom } from '../../types/typesSlice';
import { backgroundColor } from '../../styles/color';
import { actionCreateNewTable } from '../../services/actions/createNewData';
import { useDispatch } from 'react-redux';
import FormCreateNewTable from '../form/formCreateNewTable';
import OperationModal from '../modals/operationModal';
import { setTables } from '../../redux/slices/roomSlice';
import { actionUpdateRoom } from '../../services/actions/editdataTask';
import FormCreateNewTask from '../form/formCreateTask';
type Props = {
  room: TypeRoom
}
export default function RomPage({room}: Props) {
  // const data = useSelector((state: RootState) => state.task.tableList)
  const listTable = room.tables
  const [createTable, setCreateTable] = useState(false)
  const [createTask, setCreateTask] = useState<string | boolean>(false)
  const [operationModal, setOperationModal] = useState<number | boolean>(false)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [reservePlace, setReservePlace] = useState<{drop: number| null, drag: number| null} | null>(null);
  const [dragPersonTable, setDragPersonTable] = useState<number >(0);
  const [draggedOverPersonTable, setDraggedOverPersonTable] = useState<number | null>(null);
  const [dragPersonTask, setDragPersonTask] = useState<{indexTask: number, indexTable: number} >({indexTask: 0, indexTable: 0});
  const [draggedOverPersonTask, setDraggedOverPersonTask] = useState<{indexTask: number| null, indexTable: number }>({indexTask: null, indexTable: 0});
  const [isDragging, setIsDagging] = useState(false)
  const [action, setAction] = useState(false)
  const [isDraggingTaskId, setIsDraggingTaskId] = useState<number>(0)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(989898898989);
    
  },[listTable])

  const handleOnDragStart = (e: any, index: number) => {  
    if(isDragging || action) return;
    setDragPersonTable(index)
  };

  const handleSetTables = (tables: Table[]) => {

    dispatch(setTables(tables))
    const actionchangeTable = actionUpdateRoom({
      idRoom: room.idRoom,
      tables: tables
    })
    
    dispatch(actionchangeTable)
  };

  const handleOnDragEnter = (e: any, index: number) => {
    if(isDragging) return;

    setDraggedOverPersonTable(index);

    if(index == dragPersonTable) {
      return;  
    } else {
      if( dragPersonTable > index) {
        setPlaceholderIndex(index+1);
        return
      } else {
        setPlaceholderIndex(index -1)
        return
      };
    } 
  };

  const handleSort = (e: any) => {

    if(isDragging) return;
    if(draggedOverPersonTable === null) return;

    const cloneTables = [...listTable];
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
  ) => {
    setIsDagging(true);
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
    if(draggedOverPersonTask.indexTask === null) return;
    if(draggedOverPersonTask.indexTable === null) return;

    if(dragPersonTask.indexTable === draggedOverPersonTask.indexTable) {
      const cloneRoomList = [...listTable];
      const cloneTable = {...cloneRoomList[dragPersonTask.indexTable]};
      const temp = cloneRoomList[dragPersonTask.indexTable].tasks[dragPersonTask.indexTask];
      const taskList = [...cloneTable.tasks];

      taskList[dragPersonTask.indexTask] = taskList[draggedOverPersonTask.indexTask];
      taskList[draggedOverPersonTask.indexTask] = temp;
      cloneTable.tasks = taskList;
      cloneRoomList[dragPersonTask.indexTable] = cloneTable;

      
      handleSetTables(cloneRoomList);;
    } else {
      const cloneRoomList = JSON.parse(JSON.stringify(listTable));

      //tạo table mới cho mảng bị mất task
      const cloneTableStart = {...cloneRoomList[dragPersonTask.indexTable]};
      // const tempStart = cloneRoomList[dragPersonTask.indexTable].tasks[dragPersonTask.indexTask];
      const taskMove = cloneTableStart.tasks[dragPersonTask.indexTask]
      cloneTableStart.tasks.splice(dragPersonTask.indexTask,1)
      
      // taskListStart[dragPersonTask.indexTask] = taskListStart[draggedOverPersonTask.indexTask];
      // taskListStart[draggedOverPersonTask.indexTask] = tempStart;
      // cloneTableStart.tasks = taskListStart;
      console.log(cloneTableStart,'loggg');
      
      //tạo table mới cho mảng nhận task
      const cloneTableEnd = {...cloneRoomList[draggedOverPersonTask.indexTable]};
      cloneTableEnd.tasks.splice(draggedOverPersonTask.indexTask, 0, taskMove)
      console.log(cloneTableEnd,'logg1111');
      
      // const tempEnd = cloneRoomList[draggedOverPersonTask.indexTable].tasks[draggedOverPersonTask.indexTask];
      // const taskListEnd = [...cloneTableEnd.tasks.splice(draggedOverPersonTask.indexTask, 0, taskMove)];

      // taskListEnd[draggedOverPersonTask.indexTask] = taskListEnd[draggedOverPersonTask.indexTask];
      // taskListEnd[draggedOverPersonTask.indexTask] = tempEnd;
      // cloneTableEnd.tasks = taskListEnd;

      cloneRoomList[dragPersonTask.indexTable] = cloneTableStart;
      cloneRoomList[draggedOverPersonTask.indexTable] = cloneTableEnd;
      handleSetTables(cloneRoomList);
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
    table: Table, 
    indexTable: number, 
    type?: 'default' | 'space'
  ) => {
    return (
      <div 
        key={indexTable}
        className={` relative h-full  `}
        draggable
        onDragStart={(e) =>handleOnDragStart(e, indexTable)}
        onDragEnter={(e) => handleOnDragEnter(e, indexTable)}
        onDragEnd={(e) => handleSort(e)}
        onDragOver={(e) => handleOnDragOver(e)}
      > 
        {type === 'space' && <div className=' absolute bg-green-600 rounded-[5px] z-[90] w-full h-full'></div>}

        <div className={` relative min-w-[270px] rounded-[5px] flex flex-col  max-h-full bg-white active:opacity-100   text-t-1 ${reservePlace?.drag === reservePlace?.drop &&  reservePlace?.drop === indexTable ?'bg-red-800' : ''}`}>
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
          <div className='grow overflow-auto p-2'>
            <div >
              {table.tasks.map((task, index) => {
                
                if (
                  isDragging 
                  && dragPersonTask.indexTask === draggedOverPersonTask.indexTask 
                  && index === dragPersonTask.indexTask 
                  && indexTable === dragPersonTask.indexTable 
                ) return (
                  <div key={index}>
                    {contentTask(task, index, indexTable, 'space')}
                  </div>    
                );

                if (
                  isDragging 
                  && draggedOverPersonTask.indexTask === index 
                  && index != dragPersonTask.indexTask 
                  && indexTable === dragPersonTask.indexTable 
                ) return (
                  <div key={index}>
                    {contentTask(task, index, indexTable, 'space')}
                  </div>    
                );

                if (
                  isDragging
                  && draggedOverPersonTask.indexTask 
                  && index < draggedOverPersonTask.indexTask
                  && dragPersonTask .indexTask!= draggedOverPersonTask.indexTask
                  && index >= dragPersonTask.indexTask
                  && indexTable === dragPersonTask.indexTable
                ) return (
                  <div key={index}>
                    {contentTask(table.tasks[index + 1], index, indexTable)}
                  </div>
                );

                if (
                  isDragging
                  && draggedOverPersonTable != null
                  && draggedOverPersonTask.indexTask 
                  && index > draggedOverPersonTask.indexTask
                  && dragPersonTask .indexTask!= draggedOverPersonTask.indexTask
                  && index <= dragPersonTask.indexTask
                  && indexTable === dragPersonTask.indexTable
                ) return (
                  <div key={index}>
                    {contentTask(table.tasks[index - 1], index, indexTable)}
                  </div>
                );

                return (
                  <div key={index}>
                    {contentTask(task, index, indexTable)}
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            {!createTask || createTask != table.idTable ? (
              <button 
                onClick={() => {setCreateTask(table.idTable); setAction(true)}}
                className="flex font-[500] items-center w-full rounded-[5px] mt-4 p-1 hover:bg-gray-300"
              >
                <span className="text-[12px] flex items-center"><PlusOutlined className="mr-2"/></span>
                Add card
              </button>
            ) : createTask === table.idTable && (
              <FormCreateNewTask 
                onClick={() => {setCreateTask(false)}} 
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
    task: Task, 
    index: number, 
    indexTable: number,
    type?: 'default' | 'space'
  ) => {
    return (
      <div 
        draggable
        onDragStart={(e) =>handleOnDragStartTask(e, index, indexTable)}
        onDragEnter={(e) => handleOnDragEnterTask(e, index, indexTable)}
        onDragEnd={(e) => handleSortTask(e)}
        onDragOver={(e) => handleOnDragOverTask(e)}
        className={` relative`}
      >
        {type === 'space' && <div className=' absolute z-[90] w-full h-full bg-gray-100 rounded-[5px]'></div>}
        <CardFrame name={task.title}/>
      </div>
    )
  }

  return (
    <div className={`h-full grow overflow-hidden   flex flex-col ${backgroundColor.green}`}>
      <div className='h-[8%] z-[50] border-b border-gray-300 bg-white flex w-full items-center p-2'>
        <div className='flex h-full'>
          <p className='font-bold text-black ml-4 text-[20px]'>
            Room Name 
          </p>
          <p className=' text-red-500 ml-2 text-[10px] h-full flex items-start'>
            #1235656 
          </p>
          <div className='h-full w-[33px] bg-red-500 rounded-[5px] ml-4 cursor-pointer'>
            
          </div>
        </div>
        <div className='flex'>
          <button 
            onClick={() => {}} 
            className='group rounded-[5px] p-1 px-2 bg-bg-f8 flex items-center ml-8 hover:bg-gray-300 '
          >
            <span className='mr-2 flex items-center group-hover:scale-[1.3]'>
              <PlusOutlined />
            </span>
            Add list
          </button>
          <button onClick={() => {console.log(listTable);
          }} className='group rounded-[5px] p-1 px-2 bg-bg-f8 flex items-center ml-8 hover:bg-gray-300 '>
            <span className='mr-2 flex items-center group-hover:scale-[1.3]'>
              <PlusOutlined />
            </span>
            Add user
          </button>
        </div>
        <div draggable className='grow flex justify-end'>
          <div className=' cursor-pointer flex justify-end items-center '>
            <p>15</p>
              <span className='text-[25px] flex items-center ml-1'>
              <TeamOutlined />
              </span>
          </div>
        </div>
      </div>

      <div className=' w-full h-[92%]  overflow-x-auto'>   
        <div className='h-full w-full ' >
          <div className='aa overflow-x-auto overflow-y-hidden p-3 h-full w-full space-x-4 flex' >
            {listTable.map((list, indexTable) => { 
              
              if(dragPersonTable === draggedOverPersonTable && dragPersonTable === indexTable) return (
                <div key={indexTable}>
                  {contentTable(list, indexTable, 'space')}
                  
                </div>
              );

              if(
                draggedOverPersonTable === indexTable 
                && indexTable!= dragPersonTable
              ) return (
                <div key={indexTable}>
                  {contentTable(list, indexTable, 'space')}
                </div>
              );

              if(
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

              if(
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
                  className='w-full font-medium rounded-[5px] border  hover:bg-[rgba(80,79,79,0.37)] bg-[rgba(228,226,226,0.37)] text-white shadow-md p-2'
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
  )
}
