import React,{memo} from 'react'

type Props = {
    status: string,
    jobs: {} | string,
    color: number,
    onClick1?: () => void,
    onClick2?: () => void,
};



const JobCard = ({
    jobs,
    color,
    onClick1,
    onClick2,
    status
}: Props) => {

   
    

    
    return (
        <div className=' z-30 w-full h-full flex flex-col items-center container  '  >
            <div className={`h-[90%] bg-white group border  w-[90%]  relative z-30 hover:shadow-xl`} >
                <div className={`${color === 1 ? 'bg-pink-500' : color === 2 ? 'bg-green-500' :'bg-yellow-500'}   text-white font-medium text-center group-hover:font-bold group-hover:text-red-800 `}>Create page Login</div>
                <div className='p-2'>Tạo 1 pageLogin với Reactjs/tailwincss</div>
                <div className='p-2'>
                    <p>Đã đăng 13/3/2023</p>
                    <p>Deadline 5 ngày</p>
                </div>
                {status === 'home' ? (
                        <div className='z-10 absolute -bottom-[50px] text-center x] transition-all h-[50px] bg-gradient-to-t from-[rgba(65,64,64,0.5)] to-transpar w-full text-blue-800 font-medium flex justify-between p-2 group-hover:bottom-0'>                    
                            <div onClick={onClick1} className=' hover:text-white font-semibold cursor-pointer'>Chi tiết</div>
                            <div onClick={onClick2} className=' hover:text-white font-semibold cursor-pointer'>Nhận Job</div>
                        </div>
                    ) : (
                        <div className=' border-t border-gray-300 mt-3  px-4'>                    
                            <div className='text-blue-600 hover:bg-bg-1 font-semibold cursor-pointer' >Chưa Hoàn thành</div>
                            <div className='text-red-600 hover:bg-bg-1 font-semibold cursor-pointer' onClick={onClick2}>Chi tiết</div>
                        </div>
                    )
                }
            </div>
            {status === 'home' && <div className='cover  h-[10%] bg-white w-[100%] z-40 '></div>}
        </div>
    )
   
}

export default memo(JobCard)
