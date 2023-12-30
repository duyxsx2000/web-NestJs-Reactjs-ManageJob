import React, { ReactNode } from 'react'
import Navbar from '../navbar'
type Props ={
  children: ReactNode
}
export default function DefaultLayout({children}: Props) {
  return (
    <>
      <Navbar/>
      <div className=' min-h-[100vh]'>
        {children}
      </div>
      <div  style={{height: '50px', background: 'pink'}} className=' relative z-40'>
        <div className='bg-red-200 absolute z-40'>gg</div>
      </div>  
    </>
  )
}
