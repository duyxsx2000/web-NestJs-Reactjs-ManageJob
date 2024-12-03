import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import '../pages/page.css'
type Props ={
  children: ReactNode
}
export default function StartLayout({children}: Props) {

  return (
    <div className='startMain h-[100vh] m-0 flex justify-center items-center'>
      <div className='w-full h-full bg-gradient-to-br from-black to-transparent px-24 pt-2' >
        <div className='h-1/7'>
          <div className='flex text-white  text-[20px] font-semibold'>
            <div className='text-center w-1/3 flex '>
              <div className='w-[50px] h-[50px] text-center border-2 border-white'>logo</div>
            </div>
            <ul className=' list-none flex w-2/3 items-center space-x-5'>
              <li className=' hover:text-green-600 cursor-pointer'>Update Late</li>
              <li className=' hover:text-green-600 cursor-pointer'>Update Late</li>
              <li className=' hover:text-green-600 cursor-pointer'>Update Late</li>
              <li className=' hover:text-green-600 cursor-pointer'>
                <Link to={'/signIn'}>Sign in</Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
