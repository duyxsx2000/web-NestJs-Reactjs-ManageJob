import React, { useState } from 'react'

export default function PersonalInformation() {
    const [name, setName] = useState('')
    const [note, setNote] = useState('')
  return (
    <div className='mt-[30px] w-full text-gray-800'> 
      <p className=' font-semibold text-[20px]'>Manage your personal information</p>
      <div>
        <p className='font-semibold text-[20px] mt-6 border-b border-gray-300'>Public</p>
        <div className='mt-4'>
            <p>Name</p>
            <input
                onChange={(e)=> {setName(e.target.value)}}
                value={name}
                placeholder='Your name'
                className='w-full rounded-none  outline-blue-800  border border-gray-300 p-1'
            />
        </div>
        <div className='mt-4'>
            <p>Note</p>

            <textarea 
                onChange={(e)=> {setNote(e.target.value)}}
                value={note}
                className='w-full  border border-gray-300 p-1 outline-blue-800 '
            ></textarea>
        </div>
        <button className='w-full p-1 bg-blue-700 text-center font-semibold mt-2 text-white rounded-sm'>Save</button>
      </div>
    </div>
  )
}
