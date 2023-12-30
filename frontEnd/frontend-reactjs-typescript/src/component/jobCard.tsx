import React,{memo} from 'react'
import { JobType, User } from '../types';

type Props = {
    status: string,
    job: JobType,
    color: number,
    onClick1?: (() => void) | undefined,
    onClick2?: () => void,
};



const JobCard = ({
    job,
    color,
    onClick1,
    onClick2,
    status
}: Props) => {
    const style = {
        colorBg: {
            green:'from-[rgba(42,193,97,0.5)]',
            yellow:'from-[rgba(193,183,42,0.5)]',
            red:'from-[rgba(193,45,42,0.5)]'
        } 
    }
    return (
        <div className=' z-30 w-full h-full flex flex-col items-center container   '  >
            <div className={`h-[90%] bg-white group  w-[90%] rounded-lg shadow-lg  relative z-30 hover:shadow-2xl `} >
                <div className={`rounded-t-lg ${color === 3 ? 'bg-red-400' : color === 2 ? 'bg-yellow-400' :'bg-green-400'}   text-white font-medium text-center group-hover:font-bold  `}>
                    {job.name}
                </div>
                <div className='p-2 text-center'>{job.title}</div>
                <div className='p-2 text-center'>
                    <p>Đã đăng 13/3/2023</p>
                    <p>Deadline {job.deadline}</p>
                </div>
                {status === 'home' ? (
                        <div className={`z-10 absolute hidden h-[100px] text-center bottom-0 group-hover:flex items-end   duration-500 transition-all ease-in-out  rounded-b-lg bg-gradient-to-t ${color === 1 ? style.colorBg.red : color === 2 ? style.colorBg.yellow : style.colorBg.green} to-transpar w-full text-white font-medium `}>                    
                            <div className='flex justify-around p-2 w-full mb-4'>
                                <div onClick={onClick1} className='  hover:text-blue-800 font-semibold cursor-pointer'>Detail</div>
                                <div onClick={onClick2} className='  hover:text-blue-800 font-semibold cursor-pointer'>Add</div>
                            </div>
                        </div>
                    ) : (
                        <div className=' border-t border-gray-300 mt-3  px-4'>                    
                            <div className='text-blue-600 hover:bg-bg-1 font-semibold cursor-pointer' >Chưa Hoàn thành</div>
                            <div className='text-red-600 hover:bg-bg-1 font-semibold cursor-pointer' onClick={onClick2}>Chi tiết</div>
                        </div>
                    )
                }
            </div>
 
        </div>
    )
   
}

export default memo(JobCard)
