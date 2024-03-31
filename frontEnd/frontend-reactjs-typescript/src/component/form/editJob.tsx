import React, { useEffect, useState} from 'react'
import EditorBox from './editorBox';
import { AcctionType, CreateJob, JobType } from '../../types';
import { useDispatch } from 'react-redux';
import {postDataCreateJob } from '../../services/tasks/getDataRooms';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import '../../styles/postJob.css'
import {getStringDate} from '../../utils/date'
import ButtonDefault from '../button/buttonDEfault';
type Props = {
    job: JobType,
    onclick: () => void
}
export default function EditJob({job, onclick}: Props) {

    const [status, setStatus] = useState(false);
    const [date, setDate] = useState({
        start: getStringDate(job.date.start),
        expired: getStringDate(job.date.expired)
    });
    const [dataForm, setDataForm] = useState<JobType>(job);
    const dispatch = useDispatch();

    useEffect(() => {
        setDataForm(job);
        return
    },[]);

    useEffect(() => {
        setDataForm(job)
        return
    },[job]);

    useEffect(() => {
    // if(!dataForm.title) return;
    // if(!dataForm.date) return;
    // if(!dataForm.deadline) return;
    // if(!dataForm.status) return;
    // if(!dataForm.detail) return;
    // if(!dataForm.recommend) return;
    // if(!dataForm.style.color) return;
    setStatus(true)   
    },[dataForm]);

    const handleOnChangeInput = (e: any) => {
        const {name, value} = e.target; 
        console.log(value);
            
        if(name === 'date start') {
            setDataForm({
            ...dataForm,
            date: {
                ...dataForm.date,
                start: new Date(value)
            }
            });
            setDate({...date, start: value});
            return
        };

        if(name === 'date expired') {      
            setDataForm({
            ...dataForm,
            date: {
                ...dataForm.date,
                expired: new Date(value)
            }
            });
            setDate({...date, expired: value});
            return
        };

        setDataForm({
            ...dataForm,
            [name]: value
        });
        return
    };

    const handleChange = (value: any) => {
        setDataForm({
            ...dataForm,
            detail: value
        })
    };

    const updateJob = (action: 'DELETE' | 'UPDATE' , job: JobType) => {
        // const fetchAction: AsyncThunkAction<ResponseType | undefined, any, AsyncThunkConfig> | AcctionType = actionEditjob({action: action, job: job})
        // dispatch(fetchAction)
    };
    
    const onClickButton = () => {
        if(!status) return;
        updateJob('UPDATE', dataForm) 
    };

  return (
    <div className=''>
      <div className=''>
        <div className='w-full'>
          <div  className=' rounded-lg h-auto border shadow-2xl bg-white mb-9 p-2 '>
            <form className='p-4'>
              <h2 className='text-center text-black font-semibold mb-4'>FORM EDIT JOB</h2>
              <div className='flex justify-between'>
                <input 
                  type='text'
                  className='  mt-2 rounded-lg border-gray-300 border outline-none w-[48%] p-2  capitalize font-medium'
                  placeholder='Name Job'
                  name='name'
                  value={dataForm.name}
                  onChange={handleOnChangeInput}
                />
                <input 
                  type='text'
                  className='  mt-2 rounded-lg border-gray-300 border outline-none w-[48%] p-2  capitalize font-medium'
                  placeholder='Title Job'
                  name='title'
                  value={dataForm.title}
                  onChange={handleOnChangeInput}
                />
              </div>
              <div className='mt-8 mb-8'>
                <div className='flex font-semibold'>
                  <p className='w-1/4'>Start</p>
                  <p className='w-1/4'>Expired</p>
                  <p className='w-1/4'>Deadline</p>
                  <p className='w-1/4'>Priority</p>
                </div>
                <div className='flex mt-2'>
                  <div className='w-1/4 '>
                    <input 
                      type='date' 
                      className='focus:outline-none focus:ring focus:border-blue-500'
                      name='date start'
                      value={date.start}
                      onChange={handleOnChangeInput} 
                    />
                  </div>
                  <div className='w-1/4' >
                    <input 
                      type='date' 
                      className='focus:outline-none focus:ring focus:border-blue-500'
                      name='date expired'
                      value={date.expired}
                      onChange={handleOnChangeInput}
                    />
                  </div>
                  <div className='w-1/4'>
                    <select value={dataForm.deadline} className='focus:outline-none focus:ring focus:border-blue-500' name='deadline' onChange={handleOnChangeInput}>
                      <option value={'1 day'}>1 day</option>
                      <option value={'2 day'}>2 day</option>
                      <option value={'3 day'}>3 day</option>
                      <option value={'4 day'}>4 day</option>
                      <option value={'5 day'}>5 day</option>
                      <option value={'6 day'}>6 day</option>
                      <option value={'1 month'}>1 month</option>
                    </select>
                  </div>
                  <div className='w-1/4'>
                    <select value={dataForm.status} className='focus:outline-none focus:ring focus:border-blue-500' name='priority' onChange={handleOnChangeInput}>
                      <option value={'none'}>None</option>
                      <option value={'urgent'}>Urgent</option>
                      <option value={'prioritize'}>Prioritize</option>
                    </select>
                  </div>
                </div>
              </div>
              <div></div>
              <div className="editor mt-3 h-[300px]">
                <EditorBox value={dataForm.detail} onChange={handleChange}/>
              </div>
              <div className='mt-2  flex justify-center'>
                <ButtonDefault color='bg-[#9fd9e0]' onClick={onClickButton} content='UPDATE'/>
                <ButtonDefault color='bg-red-500' onClick={onclick} content='CANCEL'/>
              </div>

            </form>
          </div>
        </div> 
      </div>
    </div>
  )
}
