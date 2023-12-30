import React, { useEffect, useState} from 'react'
import DetailJob from '../../component/detailJob';
import EditorBox from '../../component/editorBox';
import { AcctionType, CreateJob } from '../../types';
import { useDispatch } from 'react-redux';
import { postDataCreateJob } from '../../redux/slices/jobsSlice';
import { AsyncThunkAction} from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AppDispatch, RootState } from '../../redux/store'; 
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import '../../styles/postJob.css'


export default function PostJob() {
  
  const [oppenEditText, setOppenEditText] = useState<boolean>(false); 
  const [status, setStatus] = useState(false)
  const [detailJob, setDetailJob] = useState('');
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
    idLeader:123,
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
    if(name === 'date start') {
      setDataForm({
        ...dataForm,
        date: {
          ...dataForm.date,
          start: new Date(value)
        }
      });
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
    <div className='mt-5'>
      <div className='flex '>
        <div className='w-3/5 min-h-[700px]  flex justify-center items-start'>
          <div  className='w-[90%] min-h-[95%] rounded-lg h-auto border shadow-2xl bg-white mb-9 '>
            <form className='p-4'>
              <h2 className='text-center text-black font-semibold mb-8'>FORM POST JOB</h2>
              <div className='flex justify-between'>
                <input 
                  type='text'
                  className='  mt-2 rounded-lg border-gray-300 border outline-none w-[45%] p-2  capitalize font-medium'
                  placeholder='Title Job'
                  name='title'
                  value={dataForm.title}
                  onChange={handleOnChangeInput}
                />
                <input 
                  type='text'
                  className='  mt-2 rounded-lg border-gray-300 border outline-none w-[45%] p-2  capitalize font-medium'
                  placeholder='Name Job'
                  name='name'
                  value={dataForm.name}
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
                      onChange={handleOnChangeInput} 
                    />
                  </div>
                  <div className='w-1/4' >
                    <input 
                      type='date' 
                      className='focus:outline-none focus:ring focus:border-blue-500'
                      name='date expired'
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
              <div className="editor mt-3">
                <EditorBox value={dataForm.detail} onChange={handleChange}/>
              </div>
              <div className='mt-4  flex justify-center'>
                <button
                  type='button'
                  className={`w-24 h-12 rounded-lg ${!status ? 'bg-gray-400 text-gray-800' : 'bg-[#9fd9e0] text-white'}  shadow-lg font-semibold hover:text-blue-800`}
                  onClick={onClickButton}>
                  POST JOB
                </button>
              </div>

            </form>
          </div>
        </div>  

        <div className='w-2/5 min-h-[700px]  flex justify-center items-start relative'>
          <div className=' absolute space-y-3 left-0 top-1'>
            <div className='w-4 h-4 bg-green-300' onClick={() => setColor('bg-green-500')}></div>
            <div className='w-4 h-4 bg-yellow-300' onClick={() => setColor('bg-yellow-500')}></div>  
            <div className='w-4 h-4 bg-red-300' onClick={() => setColor('bg-red-500')}></div>
          </div>     
        </div>
      </div>
    </div>
  )
}
