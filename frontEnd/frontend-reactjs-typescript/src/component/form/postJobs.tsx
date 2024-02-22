import React, { useEffect, useState} from 'react'
import EditorBox from './editorBox';
import { AcctionType, CreateJob, JobType } from '../../types';
import { useDispatch } from 'react-redux';
import { postDataCreateJob } from '../../redux/slices/jobsSlice';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import '../../styles/postJob.css'
import { setModalPostJob } from '../../redux/slices/statusDisplaySloce';

const PostJob = () => {

  const [status, setStatus] = useState(false)
  const [date, setDate] = useState({
    start: '2024-01-01',
    expired: '2024-01-01'
  })
  const [dataForm, setDataForm] = useState<CreateJob>({
    title: 'Title',
    name:'Name',
    date:{
      start: new Date(Date.now()),
      expired:new Date(Date.now()),
    },

    deadline: '1 day',
    priority: 'none',
    detail: '<p>Detail:</p><p class="ql-indent-1"><span style="color: rgb(55, 65, 81);">Create a function component Reactjs with a login functionality.</span></p><p><span style="color: rgb(55, 65, 81);">Requirement: </span></p><p class="ql-indent-1">Use Tailwincss, Ant Design.</p><p class="ql-indent-1">Has a modern interface.</p><p>Suggestion: </p><p class="ql-indent-1"><span style="color: rgb(55, 65, 81);">Contact the leader for more details.</span></p><p><br></p><p><br></p><p><br></p><p><br></p>',
    recommend:[12,34],
  });

  const dispatch = useDispatch()
 

  useEffect(() => {
    // if(!dataForm.title) return;
    // if(!dataForm.date) return;
    // if(!dataForm.deadline) return;
    // if(!dataForm.status) return;
    // if(!dataForm.detail) return;
    // if(!dataForm.recommend) return;
    // if(!dataForm.style.color) return;
    setStatus(true)   
  },[dataForm])

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

  const setColor = (color: string) => {
 
  }

  const handleChange = (value: any) => {
    setDataForm({
      ...dataForm,
      detail: value
    })
  };

  const postJob = async () => { 
    const acction: AsyncThunkAction<ResponseType | null, CreateJob, AsyncThunkConfig> | AcctionType  = postDataCreateJob(dataForm);
    dispatch(acction)
  }

  const onClickButton = () => {
    if(!status) return;
    postJob()   
  }

  return (
    <div className=''>
      <div className=''>
        <div className='w-full'>
          <div  className=' rounded-lg h-auto border shadow-2xl bg-white mb-9 '>
            <form className='p-4'>
              <h2 className='text-center text-black font-semibold mb-8'>FORM POST JOB</h2>
              <div className='flex justify-between'>
                <input 
                  type='text'
                  className='  mt-2 rounded-lg border-gray-300 border outline-none w-[45%] p-2  capitalize font-medium'
                  placeholder='Name Job'
                  name='name'
                  value={dataForm.name}
                  onChange={handleOnChangeInput}
                />
                <input 
                  type='text'
                  className='  mt-2 rounded-lg border-gray-300 border outline-none w-[45%] p-2  capitalize font-medium'
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
                    <select className='focus:outline-none focus:ring focus:border-blue-500' name='deadline' onChange={handleOnChangeInput}>
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
                    <select className='focus:outline-none focus:ring focus:border-blue-500' name='priority' onChange={handleOnChangeInput}>
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
              <div className='mt-2  flex justify-center space-x-4'>
                <button
                  type='button'
                  className={`w-24 h-12 rounded-lg ${!status ? 'bg-gray-400 text-gray-800' : 'bg-[#9fd9e0] text-white'}  shadow-lg font-semibold hover:text-blue-800`}
                  onClick={onClickButton}>
                  POST JOB
                </button>
                <button
                  type='button'
                  className={`w-24 h-12 rounded-lg bg-red-500 text-white  shadow-lg font-semibold hover:text-blue-800`}
                  onClick={() => dispatch(setModalPostJob(false))}>
                  CANCER
                </button>
              </div>

            </form>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default PostJob
