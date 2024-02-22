import React, { useState, useEffect } from 'react'
import JobCard from '../component/card/jobCard'
import {
  UserOutlined, 
  DownOutlined,
  HddOutlined,
  UpOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { fetchJobs } from '../redux/slices/jobsSlice';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { UnknownAction } from '@reduxjs/toolkit';
import { AcctionType, JobType } from '../types';
import ModalDefault from '../component/modals/defaultModal';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DetailJob from '../component/card/detailJob';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import DropCompunent from '../component/DragAndDrop/dropcomponent';
import DragComponent from '../component/DragAndDrop/dragComponent';

export default function HomePage() {
  const jobs = useSelector((state: RootState) => state.job.jobs.home)
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [width, setWidth] = useState<number>()
  const [statusNav, setStatusNav] = useState<string>('All Jobs')
  const [display, setDisplay] = useState<string>('listJobs')
  const [detailJob, setDetailJob] = useState<JobType | null>(null)
  const dispatch = useDispatch()
 console.log(jobs,'jobssssssssss');
 
  const [items1, setItems1] = useState<JobType[] | []  >([]);
  const [items2, setItems2] = useState<JobType[] |[]>([]);

  useEffect(() => {
    if(!jobs) {
      console.log('no jobs');
      return 
    }
    setItems1(jobs.slice(0, 5))

  },[jobs]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Nếu không có điểm đến hoặc nếu điểm đến giống điểm xuất phát, không làm gì cả
    if (!destination || destination.index === source.index) {
      return;
    }

    const sourceItems = source.droppableId === 'droppable1' ? items1 : items2;
    const destinationItems = destination.droppableId === 'droppable1' ? items1 : items2;

    // Sao chép mảng các mục
    const newSourceItems = [...sourceItems];
    const newDestinationItems = [...destinationItems];

    // Lấy phần tử đã kéo
    const draggedItem = newSourceItems[source.index];

    // Xóa phần tử đã kéo khỏi mảng nguồn
    newSourceItems.splice(source.index, 1);
    // Chèn phần tử đã kéo vào vị trí mới trong mảng đích
    newDestinationItems.splice(destination.index, 0, draggedItem);

    // Cập nhật state với mảng mới
    if (source.droppableId === 'droppable1') {
      setItems1(newSourceItems);
      setItems2(newDestinationItems);
    } else {
      setItems1(newDestinationItems);
      setItems2(newSourceItems);
    }
  };
  
  useEffect(() => {

    const handleResize = () => {

      const windowWidth = window.innerWidth;

      if (!hasRunOnce) {
        setHasRunOnce(true);
        setWidth(windowWidth)
      } else {
        setWidth(windowWidth)
      };
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasRunOnce]);

  useEffect(() => {
    console.log(1234);
    
    const action: UnknownAction | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType = fetchJobs('home');
    dispatch(action)
  },[])

  const handleClickOppenDetailJob = (job: JobType) => {
    setDetailJob(job)
  }
  const cl2 = () => {
  }

  const handleOnclickDisplay = (name: string) => {
    setDisplay(name)
  };

  const handleOnclickGetData = (name: string) => {
    setStatusNav(name)
  
  };

  return (

    <div className='homeMain z-20 top-0 flex  '>
      {detailJob && 
        <ModalDefault 
          width='w-[600px]' 
          height='h-[600px]' 
          content={(
            <div className='h-full '>
              <div className='absolute -top-[15px] -right-[220px] w-[200px] '>
                <div>
                  <button 
                    className='w-full shadow-md shadow-gray-700 cursor-pointer rounded-md h-[50px] hover:text-white hover:bg-red-800  mt-4  bg-red-500 font-bold flex justify-center items-center'
                    onClick={() => setDetailJob(null)} 
                  >
                    CLOSE
                  </button>
                  <button className='w-full shadow-md shadow-gray-700 cursor-pointer rounded-md h-[50px]  mt-4 hover:text-white hover:bg-blue-800   bg-blue-500 font-bold flex justify-center items-center'>
                    TAKE
                  </button>
                </div>
              </div>
              <div className=' relative'>
              </div>
              <div className='h-full'>
                <DetailJob job={detailJob}/>
              </div>  
            </div>
          )}
        />
      }

        <div style={{ display: 'flex' }} className='w-full h-full'>
          <div className=' md:w-[75%] w-full  bg-[rgb(233, 227, 227)] flex flex-col justify-between items-center'>
            <div className=' relative w-[95%] h-full flex flex-col justify-between  '>
              <div className='flex justify-center'>
                <div className='fixed z-[80] w-[66%] mt-4 flex rounded-[5px] shadow-lg bg-white '>
                  <div  
                    className={` w-1/5 p-[5px] text-center${statusNav !== 'All Jobs' ? '' : ' bg-[#4fd751] rounded-l-[5px] text-white font-medium  '}`}
                    onClick={() => handleOnclickGetData('All Jobs')} 
                  >
                    <div >All Jobs</div>
                  </div>
                  <div 
                    className={`w-1/5 p-[5px] text-center ${statusNav !== 'Encourage' ? '' : ' bg-[#4fd751]  text-white font-medium  '}`}
                    onClick={() => handleOnclickGetData('Encourage')} 
                  >
                    <div >Encourage</div>
                  </div>
                  <div 
                    className={`w-1/5 p-[5px] text-center ${statusNav !== 'Urgent' ? '' : ' bg-[#4fd751]  text-white font-medium  '}`}
                    onClick={() => handleOnclickGetData('Urgent')} 
                  >
                    <div >Urgent</div>
                  </div>
                  <div className='flex justify-center items-center w-[35%] ml-9'>
                    <input 
                      placeholder='search' 
                      className='w-[80%] outline-none border-x border-gray-300 p-1'>
                    </input>
                    <span className='justify-center items-center   w-1/5 flex'>
                    <SearchOutlined className='font-bold xxx' />
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex-1 min-h-[100vh]'>
                <div className=' relative mt-[70px] z-20 w-full  flex flex-wrap justify-center mb-[55px]'>
                    {items1 && items1.map((job, index) => {  
                      if(width && width < 768 && index > 17) {return}
                      return (
                        <div key={index} className=' w-[210px] h-[250px] z-[70]'>
                          <JobCard
                            key={index}
                            status='home' 
                            onClick1={()=> handleClickOppenDetailJob(job)} 
                            onClick2={cl2} 
                            color={job.priority === 'prioritize' ? 3 : job.priority === 'urgent' ? 2 : 1}
                            job={job}
                          />
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className='bottom mt-5 bottom-0 w-full h-[30px] z-[50] bg-[#F8F8FF] text-center'> 1...124 </div>
          </div>
          <div className='  right-0    w-[25%] px-5 bg-white'>
            <div className='flex space-x-5 items-center py-3 border-b border-gray-300 '>
              <div className='w-24 h-24 rounded-full bg-slate-600 flex justify-center items-center'>avata</div>
              <div className=' font-bold'>
                <p>Đỗ Khương Duy</p>
                <p>Intern Web Devenloper</p>
              </div>
            </div>
            <div className='flex space-x-3'>
              <div className='flex items-center mt-2 border-b border-gray-300'>
                <UserOutlined /> 
                <p className='mx-3'>Profile</p>
                {display === 'profile' ? 
                  <UpOutlined onClick={() =>handleOnclickDisplay('')}/> :
                  <DownOutlined onClick={() =>handleOnclickDisplay('profile')}/>  
                } 
              </div>
              <div className='flex items-center mt-2  border-b border-gray-300'>
                <HddOutlined /> 
                <p className='mx-3'>List Jobs</p>
                {display === 'listJobs' ? 
                  <UpOutlined onClick={() =>handleOnclickDisplay('')}/> :
                  <DownOutlined onClick={() =>handleOnclickDisplay('listJobs')}/>
                }  
              </div>
              <div className='flex items-center mt-2  border-b border-gray-300'>
                <HddOutlined /> 
                <p className='mx-3'>Update late</p>
                {display === 'listJobs' ? 
                  <UpOutlined onClick={() =>handleOnclickDisplay('')}/> :
                  <DownOutlined onClick={() =>handleOnclickDisplay('')}/>
                }  
              </div>
            </div>

            {display === 'listJobs' && (
              <div className=' overflow-auto h-[420px] mt-3 flex  w-[420px] '>
              </div>
            )}
            
            {display === 'profile' && (
              <div className=' mt-5  '>
                <div className='flex '>
                  <div className='w-[30%] space-y-2'>
                    <p>Họ và Tên:</p>
                    <p>Tuổi</p>
                    <p>Số điện thoại</p>
                    <p>Email</p>
                    <p>Githup</p>
                  </div>
                  <div className='w-[70%] space-y-2'>
                    <p>Đỗ Khương Duy</p>
                    <p>24</p>
                    <p>0393465147</p>
                    <p>duy123@gmail.com</p>
                    <p>duy123@githup.com</p>
                  </div>
                </div>
                <p className='mt-3 font-semibold text-red-600'>Đã tham gia công ty vào ngày 12/13/2020</p>
                <p className='mt-3 font-semibold text-green-600'>Chức vụ hiện tại Intern web developer</p>
              </div>
            )}
          </div>
        </div>
    </div>
   
  )
}
