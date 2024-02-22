import React from 'react'
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import DOMPurify from 'dompurify';
import '../../styles/postJob.css'
import { CommentOutlined, PhoneOutlined , MailOutlined } from '@ant-design/icons';
import { JobType } from '../../types';

type Props = {
  job: JobType   
}

const DetailJob = ({job}:Props) => {
  const convertDateFormat = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  return (
    <div className='w-full h-full rounded-lg   mb-9 shadow-2xl bg-white flex flex-col '>
      <div className={`px-4 border-b rounded-t-lg border-gray-300 bg-green-400 text-white`}>
        <h3 className={`font-semibold text-center mb-6}`}>{job.name}</h3>
        <p className='w-full text-center'>{job.title}</p>
        <div className='flex mt-3'>
          <p className='w-[100px] font-semibold'>Start</p>
          {convertDateFormat(job.date.start.toString())} 
        </div>
        <div className='flex ' >
          <p className='w-[100px] font-semibold'>Expired</p> 
          {convertDateFormat(job.date.expired.toString())}
        </div>
        <div className='flex '>
          <p className='w-[100px] font-semibold'>Deadline</p>
          {job.deadline}
        </div>
        <div className='flex items-center mb-2 '>
          <p className='w-[100px] font-semibold'>Leader</p>
          Nguyễn Nhật Nam
        </div>
      </div>
      <div className='p-4 mt-2 flex-1'>
      {job.detail && <div dangerouslySetInnerHTML={{ __html:DOMPurify.sanitize(job.detail)  }} />}
      </div>
      <div className='p-4 text-end font-semibold flex items-center justify-end space-x-5'>
        <p>Leader Nguyễn Nhật Nam </p>
        <div className='flex items-center space-x-2 '>
          <span className='hover:text-blue-800 flex items-center'><CommentOutlined/></span>
          <span className='hover:text-blue-800 flex items-center'><PhoneOutlined /></span>
          <span className='hover:text-blue-800 flex items-center'><MailOutlined /></span>  
        </div>
      </div>
    </div>
  )
};

export default DetailJob
