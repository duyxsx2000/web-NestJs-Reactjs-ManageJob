import React from 'react'
import {LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
  return (
    <div className=' fixed w-full h-[100vh] z-50  top-0 left-0'>
        <div className='w-full h-full flex justify-center items-center bg-[rgba(220,218,218,0.5)]'>
            <LoadingOutlined  style={{fontSize:'60px', color:'blue'}}/>
        </div>
    </div>
  )
}
