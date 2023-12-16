import React from 'react'

export default function Navbar() {
  const style = 'font-bold hover:text-blue-500 cursor-pointer'
  return (
    <div  className=' flex px-10 justify-center  items-center sticky top-0 z-50 h-[50px] w-full border-b bg-gradient-to-r from-green-400 to-yellow-100 border-gray-300'>
      <div className='flex space-x-12 text-xl '>
        <div className='font-bold hover:text-blue-500 cursor-pointer'>Trang Chủ</div>
        <div className={style}>Nhóm</div>
        <div className={style}>Trang Trò Chuyện</div>
        <div className={style}>Phòng Họp</div>
        <div className={style}>Lịch Sử</div>
        <div className={style}>ADMIN</div>
      </div> 
    </div>
  )
}
