import React, { useEffect, useState } from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  FileDoneOutlined,
  MenuOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { actionEditjob, fetchJobs } from '../../redux/slices/jobsSlice';
import { useDispatch } from 'react-redux';
import { AcctionType, JobType, User } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Nodata from '../../component/nodata';
import ModalDefault from '../../component/modals/defaultModal';
import ButtonDefault from '../../component/button/buttonDEfault';
import { fetchUserByAdmin } from '../../redux/slices/usersSlice';
import PostJob from '../../component/form/postJobs';
import { setModalPostJob } from '../../redux/slices/statusDisplaySloce';
import EditJob from '../../component/form/editJob';

type ActionModal = {
  action: 'DELETE' | 'UPDATE',
  job: JobType
};

export default function Jobs() {

  const dispatch = useDispatch()
  const dataJobs = useSelector((state: RootState) => state.job.jobs.admin)
  const dataUsers = useSelector((state: RootState) => state.users.data)
  const [editJob, setEDitJob] = useState<JobType | null> (null)
  const [jobs, setJobs] = useState<JobType[] | null >()
  const [actionModal, setActionModal] = useState<ActionModal | null>(null)
  const [category, setCategory] = useState<'all jobs' | 'being made' | 'waiting'>('all jobs')

  useEffect( () => {
    const actionFetchJobs: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType = fetchJobs('admin');
    dispatch(actionFetchJobs);
    const actionFetchUsers: AsyncThunkAction<ResponseType | null, any, AsyncThunkConfig> | AcctionType = fetchUserByAdmin('fetch'); 
    dispatch(actionFetchUsers)   
  },[])


  useEffect(() => {

    if(!dataJobs) {
      setJobs(null);
      return
    };

    if(category === 'all jobs') { 
      setJobs(dataJobs)
      return
    };

    if(category === 'being made') {

      const jobsFilter = dataJobs?.filter((job) => job.status === 'being made')
      if(jobsFilter.length > 0) { 
        setJobs(jobsFilter)
        return
      }
      setJobs(null);
      return
    };

    if(category === 'waiting') {
      const jobsFilter = dataJobs?.filter((job) => job.status === 'waiting')
      if(jobsFilter?.length > 0) { 
        setJobs(jobsFilter)
        return
      }
      setJobs(null);
      return
    };
    
  },[category,dataJobs]);

  const handleOnclickChangeCategory = (category: 'all jobs' | 'being made' | 'waiting') => {
    setCategory(category)
  };



  const handleOnlickChangeActionModal = (job: JobType, action: 'DELETE' | 'UPDATE') => {
    setActionModal({
      action: action,
      job: job
    })
  };

  const handleOnlickUpdateJob = (action: 'DELETE' | 'UPDATE' , job: JobType) => {
    const fetchAction: AsyncThunkAction<ResponseType | undefined, any, AsyncThunkConfig> | AcctionType = actionEditjob({action: action, job: job})
    dispatch(fetchAction)
  }

  const jopsCard = (job : JobType, width: string) => {
    const leader = dataUsers?.find((user) => user.id === job.idLeader)
    const staff = dataUsers?.find((user) => user.id === job.idStaff)
    return (
      <div className={`${width} h-[280px] flex justify-center items-center `}>
        <div className='w-[90%] h-[90%] bg-white shadow-md hover:shadow-xl rounded-lg flex flex-col justify-between pb-2 '>
          <div>
            <p className=' bg-red-500 rounded-t-lg p-1 font-semibold text-center text-white'>{job.name}</p>
            <p className=' ml-2 mr-2 flex p-1 '>
              <span className='w-1/3 mr-1 font-semibold'>ID</span>
              <span>{job.idJob}</span>
            </p>
            <p className=' ml-2 mr-2 flex p-1'>
              <span className='w-1/3 mr-1 font-semibold'>Status</span>
              <span>{job.status}</span>
            </p>
            <p className=' ml-2 mr-2 flex p-1'>
              <span className='w-1/3 mr-1 font-semibold'>Staff</span>
              <span>{staff ? staff.name : 'waiting'}</span>
            </p>
            <p className=' ml-2 mr-2 flex p-1'>
              <span className='w-1/3 mr-1 font-semibold'>Leader</span>
              <span>{leader?.name}</span>
            </p>
            <p className=' ml-2 mr-2 flex p-1'>
              <span className='w-1/3 mr-1 font-semibold'>Expired</span>
              <span>12/2/2029</span>
            </p>

          </div>
          <div className='flex items-center justify-around text-blue-500 '>
            <DeleteOutlined 
              className='hover:scale-[1.1]' 
              onClick={() => handleOnlickChangeActionModal(job, 'DELETE')} 
            />
            <EditOutlined 
              className='hover:scale-[1.1]' 
              onClick={() => handleOnlickChangeActionModal(job, 'DELETE')}
            />
            <FileDoneOutlined 
              className='hover:scale-[1.1]' 
              onClick={() => handleOnlickChangeActionModal(job, 'UPDATE')}
            />
            <MenuOutlined 
              className='hover:scale-[1.1]' 
              onClick={() => handleOnlickChangeActionModal(job, 'DELETE')}
            />
          </div>
        </div>
      </div>
    )
  };

  const modal = (action:'DELETE'|'UPDATE') => {
    return (
      <div className='w-full h-full flex p-3'>
        {actionModal?.job && jopsCard(actionModal?.job, 'w-1/2')}

        <div className='w-1/2'>
          <p className='font-semibold'>
            {
              action === 'DELETE' ? 'Are you sure you want to DELETE the job?' : 
              action === 'UPDATE' ? 'Are you sure you want to mark this job complete?' : ''    
            }
          </p>
          <div className='flex mt-8 justify-center space-x-4'>
            <ButtonDefault 
              onClick={() => {
                actionModal?.job.idJob && handleOnlickUpdateJob(action, actionModal?.job);
                setActionModal(null)
              }} 
              color='bg-red-500'
              content={action}
            />
            <ButtonDefault 
              onClick={() => {setActionModal(null)}} 
              color='bg-blue-500'
              content='CANCEL'
            />
          </div>
        </div>
        
      </div>
    )
  };

  return (
    <div className='w-full h-full relative flex flex-col justify-between '>
      <button onClick={() => jobs && setEDitJob(jobs[1])}>click mee</button>
      {actionModal && (
        <ModalDefault
          width=''
          height=''
          content= {modal(actionModal.action)}
        />
      )}

      {editJob &&  (
        <ModalDefault
          width='w-[700px]'
          height='h-[300px]'
          content={(
            <EditJob job={editJob}/>
          )}
        />
      )}

      <div className='fixed z-[70] w-[66%] mt-4 flex rounded-[5px] shadow-lg top-[40px] border border-gray-300  bg-white '>
        <div  
          className={` w-1/5 p-[5px] text-center cursor-pointer ${category !== 'all jobs' ? '' : ' bg-[#4fd751] rounded-l-[5px] text-white font-medium  '}`}
          onClick={() => handleOnclickChangeCategory('all jobs')} 
        >
          <div >All Jobs</div>
        </div>
        <div 
          className={`w-1/5 p-[5px] text-center cursor-pointer ${category !== 'being made' ? '' : ' bg-[#4fd751]  text-white font-medium  '}`}
          onClick={() => handleOnclickChangeCategory('being made')} 
        >
          <div >Being Made</div>
        </div>
        <div 
          className={`w-1/5 p-[5px] text-center cursor-pointer ${category !== 'waiting' ? '' : ' bg-[#4fd751] rounded-r-[5px] text-white font-medium  '}`}
          onClick={() => handleOnclickChangeCategory('waiting')} 
        >
          <div >Waiting</div>
        </div>
        <div className='flex group justify-center items-center w-[35%] ml-9'>
          <input 
            placeholder='search' 
            className='w-[80%] outline-none border-x border-gray-300 p-1'>
          </input>
          <span className='justify-center items-center group-hover:text-[25px]   w-1/5 flex'>
          <SearchOutlined className=' font-bold xxx' />
          </span>
        </div>
      </div>
      <div>
        <div className='w-full flex flex-wrap mt-2 '>
          {jobs ? 
            jobs.map((job) => jopsCard(job, 'w-1/5')) :  
            (
              <div className='h-[500px] w-full felx justify-center'>
                <Nodata/>
              </div>
            )
          }
        </div>
      </div>
      <div className='text-center'>123....99</div>
    </div>
  )
}
