import React, { ReactNode } from 'react'
import Navbar from '../navbar'
type Props ={
  children: ReactNode
}
export default function DefaultLayout({children}: Props) {
  return (
    <div className='flex flex-col h-[100vh]'>
      <Navbar/>
      <div className='grow'>
        {children}
      </div>
      {/* <div  style={{height: '50px', background: 'pink'}} className=' relative z-40'>
        <div className='bg-red-200 absolute z-40'>gg</div>
      </div>   */}
    </div>
  )
}
