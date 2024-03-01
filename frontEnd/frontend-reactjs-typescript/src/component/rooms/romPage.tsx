import React, {useState, useRef, useEffect} from 'react'
import {
  PlusOutlined,
  TeamOutlined,
  DashOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DataTask, TaskList } from '../../types';
import CardFrame from '../listFrames/cardFrame';
export default function RomPage() {
  const data = useSelector((state: RootState) => state.task.tableList)
  const [roomList, setRoomList] = useState<DataTask[]>(data);
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [reservePlace, setReservePlace] = useState<{drop: number| null, drag: number| null} | null>(null);
  const [dragPersonTable, setDragPersonTable] = useState<number >(0);
  const [draggedOverPersonTable, setDraggedOverPersonTable] = useState<number | null>(null);
  const [dragPersonTask, setDragPersonTask] = useState<{indexTask: number, indexTable: number} >({indexTask: 0, indexTable: 0});
  const [draggedOverPersonTask, setDraggedOverPersonTask] = useState<{indexTask: number| null, indexTable: number }>({indexTask: null, indexTable: 0});
  const [isDragging, setIsDagging] = useState(false)
  const [isDraggingTaskId, setIsDraggingTaskId] = useState<number>(0)

  const handleOnDragStart = (e: any, index: number) => {  
    if(isDragging) return;
    setDragPersonTable(index)
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

    const roomListClone = [...roomList];
    const temp = roomListClone[dragPersonTable];

    roomListClone.splice(dragPersonTable, 1);
    roomListClone.splice(draggedOverPersonTable, 0, temp);

    setRoomList(roomListClone);
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
    if(dragPersonTask.indexTable === draggedOverPersonTask.indexTable) {

      const cloneRoomList = [...roomList];
      const cloneRoom = {...cloneRoomList[dragPersonTask.indexTable]};
      const temp = cloneRoomList[dragPersonTask.indexTable].taskList[dragPersonTask.indexTask];
      const taskList = [...cloneRoom.taskList];

      taskList[dragPersonTask.indexTask] = taskList[draggedOverPersonTask.indexTask];
      taskList[draggedOverPersonTask.indexTask] = temp;
      cloneRoom.taskList = taskList;
      cloneRoomList[dragPersonTask.indexTable] = cloneRoom;

      setRoomList(cloneRoomList);
    };

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
    table: DataTask, 
    indexTable: number, 
    type?: 'default' | 'space'
  ) => {
    return (
      <div>
        <div 
          key={indexTable}
          className={` relative `}
          draggable
          onDragStart={(e) =>handleOnDragStart(e, indexTable)}
          onDragEnter={(e) => handleOnDragEnter(e, indexTable)}
          onDragEnd={(e) => handleSort(e)}
          onDragOver={(e) => handleOnDragOver(e)}
        > 
          {type === 'space' && <div className=' absolute bg-gray-100 rounded-[5px] z-[90] w-full h-full'></div>}
          <div className={`min-w-[270px] rounded-[5px] min-h-[90px] bg-red-200 active:opacity-100  p-3 text-t-1 ${reservePlace?.drag === reservePlace?.drop &&  reservePlace?.drop === indexTable ?'bg-red-800' : ''}`}>
            <div className="flex justify-between p-1 ">
              <p className="font-[500] ">{table.name}</p>
              <span className="flex items-center">
                  <DashOutlined />
              </span>
            </div>
            <div >
              {table.taskList.map((task, index) => {

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
                ) return (
                  <div key={index}>
                    {contentTask(table.taskList[index + 1], index, indexTable)}
                  </div>
                );

                if (
                  isDragging
                  && draggedOverPersonTable != null
                  && draggedOverPersonTask.indexTask 
                  && index > draggedOverPersonTask.indexTask
                  && dragPersonTask .indexTask!= draggedOverPersonTask.indexTask
                  && index <= dragPersonTask.indexTask
                ) return (
                  <div key={index}>
                    {contentTask(table.taskList[index - 1], index, indexTable)}
                  </div>
                );

                return (
                  <div key={index}>
                    {contentTask(task, index, indexTable)}
                  </div>
                )
              })}
            </div>
            <div>
              <button className="flex font-[500] items-center w-full rounded-[5px] mt-4 p-1 hover:bg-gray-300">
                <span className="text-[12px] flex items-center"><PlusOutlined className="mr-2"/></span>
                Add card
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  const contentTask = (
    task: TaskList, 
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
        {type === 'space' && <div className=' absolute z-[90] w-full h-full bg-gray-100 rounded-[10px]'></div>}
        <CardFrame name={task.name}/>
      </div>
    )
  }

  return (
    <div className={`h-full grow overflow-hidden  flex flex-col`}>
        <nav className='h-[50px] border-b border-gray-300 bg-white flex w-full items-center p-2'>
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
            <button onClick={() => {console.log(dragPersonTable, draggedOverPersonTable);
            }} className='group rounded-[5px] p-1 px-2 bg-bg-f8 flex items-center ml-8 hover:bg-gray-300 '>
              <span className='mr-2 flex items-center group-hover:scale-[1.3]'>
                <PlusOutlined />
              </span>
              Add list
            </button>
            <button onClick={() => {console.log(roomList);
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
        </nav>
        <div className='w-full grow '>   
          <div className='h-full  ' >
            <div className='aa overflow-x-auto overflow-y-hidden p-3 h-full space-x-4 flex' >
              {roomList.map((list, indexTable) => { 
                
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
                    {contentTable(roomList[indexTable + 1], indexTable, 'default'  )}
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
                    {contentTable(roomList[indexTable - 1], indexTable, 'default'  )}
                  </div>
                );

                return (
                  <div key={indexTable}>
                    {contentTable(list, indexTable, 'default')}
                  </div>
                )
              })}    
            </div>            
          </div>

        </div>
    </div>
  )
}
