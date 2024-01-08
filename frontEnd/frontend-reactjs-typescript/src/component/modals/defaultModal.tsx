import React, {ReactNode, useEffect, useState} from 'react'
type Props = {
    width: string,
    height: string,
    content: ReactNode
}

export default function ModalDefault({
  width,
  height,
  content
}: Props) {

  const [status, setStatus] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setStatus(true)
    }, 100);
    return () => clearTimeout(timeOut)
  },[]);


  return (
    <div className='fixed w-full h-[100vh]  bg-[rgba(112,112,112,0.7)] top-0 left-0 z-[90] flex justify-center items-center'>
      <div className={` ${width} ${height} bg-white fixed z-[90] rounded-lg shadow-md shadow-gray-500   transition-all ${status ? 'top-[40px]' : '-top-[500px]'}`}>   
       {content}
      </div>
    </div>
  )
}
