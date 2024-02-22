import React, { useEffect, useState } from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  FileDoneOutlined,
  MenuOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { actionEditjob, fetchJobs } from '../../../redux/slices/jobsSlice';
import { AcctionType, JobType, User } from '../../../types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Nodata from '../../../component/nodata';
import ModalDefault from '../../../component/modals/defaultModal';
import ButtonDefault from '../../../component/button/buttonDEfault';
import { fetchUserByAdmin } from '../../../redux/slices/usersSlice';
import EditJob from '../../../component/form/editJob';
import Loading from '../../../component/loading';
import DetailJob from '../../../component/card/detailJob';
import ButtonAddJob from '../../../component/button/buttonAddJob';
import BarCharByJobs from '../../../component/charts/barChart';
import { fetchDataCountJobs } from '../../../redux/slices/dashboardSlice';
import { setModalPostJob } from '../../../redux/slices/statusDisplaySloce';
import PostJob from '../../../component/form/postJobs';

type ActionModal = {
  action: 'DELETE' | 'UPDATE',
  job: JobType
};

type DataInput = {
  time: Date,
  type: 'MONTH' | 'DAY' | 'YEAR'| 'ALL'
}
export default function Jobs() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.job.loading);
  const dataJobs = useSelector((state: RootState) => state.job.jobs.admin);
  const dataUsers = useSelector((state: RootState) => state.users.data);
  const dataCountJob = useSelector((state: RootState) => state.dashboard.countJobs);
  const postJob  = useSelector((state: RootState) => state.display.modalPostJob);

  const [editJob, setEDitJob] = useState<JobType | null> (null);
  const [detailJob, setDetailJob] = useState<JobType | null>(null)
  const [jobs, setJobs] = useState<JobType[] | null >();
  const [actionModal, setActionModal] = useState<ActionModal | null>(null);
  const [category, setCategory] = useState<'all jobs' | 'being made' | 'waiting'>('all jobs');

  useEffect( () => {
    const actionFetchJobs: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType = fetchJobs('admin');
    const action: AsyncThunkAction<any, DataInput, AsyncThunkConfig> | AcctionType = fetchDataCountJobs({time: new Date(Date.now()), type: 'ALL'});
    const actionFetchUsers: AsyncThunkAction<ResponseType | null, any, AsyncThunkConfig> | AcctionType = fetchUserByAdmin('fetch'); 

    dispatch(actionFetchJobs);
    dispatch(action);
    dispatch(actionFetchUsers) ;  
  },[]);

  useEffect(() => {

    if(!dataJobs) {
      setJobs(null);
      return
    };

    if(category === 'all jobs') { 
      setJobs(dataJobs);
      return
    };

    if(category === 'being made') {
      const jobsFilter = dataJobs?.filter((job) => job.status === 'being made');

      if(jobsFilter.length > 0) { 
        setJobs(jobsFilter)
        return
      };

      setJobs(null);
      return
    };

    if(category === 'waiting') {
      const jobsFilter = dataJobs?.filter((job) => job.status === 'waiting')

      if(jobsFilter?.length > 0) { 
        setJobs(jobsFilter)
        return
      };

      setJobs(null);
      return
    };
    
  },[category,dataJobs]);

  useEffect(() => {
    console.log(dataCountJob);
    
  }, [dataCountJob])

  const handleOnclickChangeCategory = (category: 'all jobs' | 'being made' | 'waiting') => {
    setCategory(category)
  };

  const handleOnlickChangeActionModal = (job: JobType, action: 'DELETE' | 'UPDATE') => {
    setActionModal({
      action: action,
      job: job
    });
  };

  const handleOnlickUpdateJob = (action: 'DELETE' | 'UPDATE' , job: JobType) => {
    const fetchAction: AsyncThunkAction<ResponseType | undefined, any, AsyncThunkConfig> | AcctionType = actionEditjob({action: action, job: job})
    dispatch(fetchAction)
  };

  const jopsCard = (job : JobType, width: string) => {

    const leader = dataUsers?.find((user) => user.id === job.idLeader);
    const staff = dataUsers?.find((user) => user.id === job.idStaff);

    return (
      <div className={`${width} h-[280px] flex justify-center items-center `}>
        <div className='w-[90%] h-[90%] bg-white shadow-md hover:shadow-xl rounded-lg flex flex-col justify-between pb-2 '>
          <div>
            <p className=' bg-green-500 rounded-t-lg p-1 font-semibold text-center text-white'>{job.name}</p>
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
              <span className='w-1/3 mr-1 font-semibold'>Leade</span>
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
              onClick={() =>setEDitJob(job)}
            />
            <FileDoneOutlined 
              className='hover:scale-[1.1]' 
              onClick={() => handleOnlickChangeActionModal(job, 'UPDATE')}
            />
            <MenuOutlined 
              className='hover:scale-[1.1]' 
              onClick={() => setDetailJob(job)}
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
      {loading && <Loading/>}
      {detailJob && 
        <ModalDefault 
          width='w-[600px]' 
          height='h-[600px]' 
          content={(
            <div className='h-full '>
              <div className='absolute -top-[5px] right-[3px] text-white '>
                <CloseOutlined onClick={() => setDetailJob(null)} />
              </div>
              <div className=' relative'>
              </div>
              <div className='h-full '>
                <DetailJob job={detailJob}/>
              </div>  
            </div>
          )}
        />
      }

      {postJob && (
        <ModalDefault
          width='w-[700px]'
          height='h-[300px]'
          content={(
            <PostJob/>
          )}
        />
      )}

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
            <EditJob 
              job={editJob}
              onclick={() => {setEDitJob(null)}}
            />
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

      <div className='flex'>
        <div className='w-[65%] h-[100vh] overflow-auto'>
          <div className='w-full flex flex-wrap mt-2 '>
            <ButtonAddJob
              onClick={() => {dispatch(setModalPostJob(true))}}
              color='green'
              width='w-1/4'
            />
            {jobs ? 
              jobs.map((job) => jopsCard(job, 'w-1/4')) :  
              (
                <div className='h-[500px] w-full felx justify-center'>
                  <Nodata/>
                </div>
              )
            }
          </div>
        </div>
        <div className='w-[40%] h-[100vh] mt-4 space-y-8 overflow-auto'>
          <div className=' sticky'>
            <BarCharByJobs
              name ='Day'
              countJob = {dataCountJob.countJobOfDay && dataCountJob.countJobOfDay}
            />
            <BarCharByJobs
              name ='Month'
              countJob = {dataCountJob.countJobOfMonth && dataCountJob.countJobOfMonth}
            />
             <BarCharByJobs
              name ='Year'
              countJob = {dataCountJob.countJobOfYear && dataCountJob.countJobOfYear}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
