import React from 'react'

export default function Task() {
    
  return (
    <div>
        <div className='w-[600px]'>
            <p className=' font-semibold text-[25px] mt-[30px]'>Task</p>
        </div>
        <div className='w-[600px]'>
            <p className=' font-semibold text-[25px] mt-[25px] border-b border-gray-300'>Present</p>
            <div className='mt-2 h-[50px]  bg-gray-300 flex items-center justify-center font-semibold'>no tasks</div>
        </div>
        <div className='w-[600px]'>
            <p className=' font-semibold text-[25px] mt-[25px] border-b border-gray-300'>Done</p>
            <div className='mt-2 h-[50px]  bg-gray-300 flex items-center justify-center font-semibold'>no tasks</div>
        </div>
      
    </div>
  )
}
