import React,{memo, useEffect, useState} from 'react'
import { JobType, User } from '../../types';

type Props = {
    status: string,
    job: JobType,
    color: number,
    onClick1?: (() => void) | undefined,
    onClick2?: () => void,
};


type Style = {
    name: string,
    from:string,
    button: string
};

const JobCard = ({
    job,
    color,
    onClick1,
    onClick2,
    status
}: Props) => {
    const [style, setStyle] = useState<Style>({
        name: '',
        from:'',
        button:''

    })
    useEffect(()=> {

        if(color === 3) {
            setStyle({
                name:'bg-red-500',
                button: 'bg-red-600',
                from:'from-red-500'
            });
            return
        };

        if(color === 2) {
            setStyle({
                name:'bg-yellow-500',
                button: 'bg-yellow-600',
                from:'from-yellow-500'
            });
            return
        };

        if(color === 1) {
            setStyle({
                name:'bg-green-500',
                button: 'bg-green-600',
                from: 'from-green-500'
            });
            return
        };

        return

    },[])
    return (
        <div className=' z-30 w-full h-full flex flex-col items-center container   '  >
            <div className={`h-[90%] bg-white group flex flex-col  w-[90%] rounded-lg shadow-lg  relative z-30 hover:shadow-2xl `} >
                <div className={`rounded-t-lg ${style.name}  text-white font-medium text-center p-1 `}>
                    <p className='group-hover:scale-[1.1]'>{job.name}</p>
                </div>
                <div className='flex flex-col justify-between flex-1 p-1'>
                    <div className='p-2 text-center'>{job.title}</div>
                    <div className='p-2 text-center'>
                        <p>Đã đăng 13/3/2023</p>
                        <p>Deadline {job.deadline}</p>
                    </div>
                </div>

                
                {status === 'home' ? (
                        <div className={`z-10 absolute hidden h-[200px] text-center bottom-0 group-hover:flex items-end duration-500 transition-all ease-in-out  rounded-b-lg bg-gradient-to-t ${style.from} to-transpar w-full text-white font-medium `}>                    
                            <div className='flex justify-around p-2 w-full mb-4'>
                                <div onClick={onClick1} className={` font-medium cursor-pointer w-[70px] p-2 border-2 border-double   ${style.name} rounded-[5px]  `}>
                                    <p className='hover:scale-[1.2]'>Detail</p>
                                </div>
                                <div onClick={onClick2} className={`font-medium  cursor-pointer w-[70px] p-2 border-2 border-double   ${style.name} rounded-[5px]  `}>
                                    <p className='hover:scale-[1.2]'>Add</p>
                                </div>
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
