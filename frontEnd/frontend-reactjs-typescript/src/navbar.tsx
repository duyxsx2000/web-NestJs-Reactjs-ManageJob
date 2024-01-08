import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const style = 'font-semibold hover:text-blue-500 cursor-pointer'
  return (
    <div  className=' flex px-10 justify-center items-center sticky top-0 z-[90] h-[50px] w-full border-b  bg-[#151515] border-gray-300 text-white'>
      <div className='flex space-x-12 text-xl '>
        <div className=' font-semibold hover:text-blue-500 cursor-pointer'>
          <Link to='/home'>HOME</Link>
        </div>
        <div className={style}>GROUP</div>
        <div className={style}>CHAT</div>
        <div className={style}>MEETING ROOMS</div>
        <div className={style}>ClENDAR</div>
        <div className={`font-semibold group  cursor-pointer group relative`}>
          <Link className='hover:text-blue-500' to='/admin'>ADMIN</Link>
          <div className='absolute hidden group-hover:block font-semibold rounded-b-lg w-[200%] -translate-x-1/4 bg-[#151515] shadow-md  top-full z-[100]'>
            <div className='border-b hover:text-blue-500 border-gray-600 mt-4 text-center'><Link to='/admin/users'>Users</Link></div> 
            <div className='border-b hover:text-blue-500 border-gray-600 mt-4 text-center'><Link to='/admin/jobs'>Jobs</Link></div> 
            <div className='border-b hover:text-blue-500 border-gray-600 mt-4 text-center rounded-b-lg mb-2'><Link to='/admin/dashboard'>Dashboard</Link></div> 
          </div>
        </div>
        <div className={style}>DASHBOARD</div>
      </div> 
    </div>
  )
}
