import React from 'react'

export default function NavbaStart() {
  return (
    <div className='h-1/4'>
        <div className='flex text-white  text-[20px] font-semibold'>
        <div className='text-center w-1/3 flex '>
            <div className='w-[60px] h-[60px] text-center border-2 border-white'>logo</div>
        </div>
        <ul className=' list-none flex w-2/3 items-center'>
            <li className=' hover:text-green-600 cursor-pointer'>Update Late</li>
            <li className=' hover:text-green-600 cursor-pointer'>Update Late</li>
            <li className=' hover:text-green-600 cursor-pointer'>Update Late</li>
            <li className=' hover:text-green-600 cursor-pointer'>Sign in / Sign up</li>
        </ul>
        </div>
    </div>
  )
}
