import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const style = 'font-semibold hover:text-blue-500 cursor-pointer'
  return (
    <div  className=' flex px-10 justify-center items-center sticky top-0 z-30 h-[50px] w-full border-b bg-gradient-to-r from-[#0A0A0A] to-[#151515] border-gray-300 text-white'>
      <div className='flex space-x-12 text-xl '>
        <div className=' font-semibold hover:text-blue-500 cursor-pointer'>
        <Link to='/home'>HOME</Link>
        </div>
        <div className={style}>GROUP</div>
        <div className={style}>CHAT</div>
        <div className={style}>MEETING ROOMS</div>
        <div className={style}>ClENDAR</div>
        <div className={style}>
          <Link to='/admin'>ADMIN</Link>
        </div>
        <div className={style}>DASHBOARD</div>
      </div> 
    </div>
  )
}
